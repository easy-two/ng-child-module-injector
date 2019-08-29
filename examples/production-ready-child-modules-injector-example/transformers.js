const ts = require('typescript');

module.exports = {ngModulePathTransformer};

// from @angular/devkit (AngularCompilerPlugin)
OPERATION_KIND.ADD = 0;
OPERATION_KIND.REMOVE = 1;
OPERATION_KIND.REPLACE = 2;

// transformer implementation
function ngModulePathTransformer(context) {
  return {
    transformSourceFile: sourceFile => {
      const transformations = getTransformations(sourceFile);

      return applyTransformations(sourceFile, transformations, context);
    }
  }
}

/**
 * Applied files with CHILD_INJECTOR_MODULES token.
 * Modifies arguments of forModules call in compiled files (*.ngfactory.module.ts)./
 * @param sourceFile
 * @returns {[]|Array}
 */
function getTransformations(sourceFile) {
  // find all imports
  const allImports = collectDeepNodes(sourceFile, ts.SyntaxKind.ImportDeclaration);

  // find import for child-injector-tokens file
  const importForChildInjectorModuleToken = allImports.find(importDeclaration => {
    return collectDeepNodes(importDeclaration, ts.SyntaxKind.StringLiteral).some(stringLiteral => stringLiteral.text.includes('child-injector-tokens'))
  });

  if (!importForChildInjectorModuleToken) {
    return [];
  }

  // find identifier of import (how is it imported, for example "import * as something from ..."). we find something identifier there
  const importIdentifier = collectDeepNodes(importForChildInjectorModuleToken, ts.SyntaxKind.Identifier)[0];

  if (!importIdentifier) {
    return [];
  }

  const identifierToFindName = importIdentifier.text;

  // find all call expressions (we need one of them)
  const allCallExpressions = collectDeepNodes(sourceFile, ts.SyntaxKind.CallExpression);

  // find call expression near token CHILD_INJECTOR_MODULES (it will be modified)
  const callExpressionsAboutCIMForModules = allCallExpressions.find(callExpression => {
    return callExpression.arguments.some(argument => {
      if (argument.kind !== ts.SyntaxKind.PropertyAccessExpression) {
        return false;
      }
      const propertyAccessExpression = argument;
      return propertyAccessExpression.expression.text === identifierToFindName && propertyAccessExpression.name.text === 'CHILD_INJECTOR_MODULES';
    });
  });

  if (!callExpressionsAboutCIMForModules) {
    return [];
  }

  // get third argument of call expression
  const arrayLiteralToModify = callExpressionsAboutCIMForModules.arguments[2];

  if (!arrayLiteralToModify) {
    return [];
  }

  const ops = [];

  // argument which we pass to forModules function is an array
  arrayLiteralToModify.elements.forEach(arrayLiteral => {
    // we need to change first element of array (which we passed to forModules)
    const propertyAccessExpressionToModify = arrayLiteral.elements[0];

    // we need left side (before dot) part of property access expression (like obj.prop, we get "obj" there)
    const moduleImportNameNode = propertyAccessExpressionToModify.expression;
    const importDeclarationName = moduleImportNameNode.text;

    // we need right side (after dot) part of property access expression (like obj.prop, we get "prop" there)
    const moduleUsageNode = propertyAccessExpressionToModify.name;
    const moduleName = moduleUsageNode.text;

    // this is how property would be changed
    const moduleNameModifier = moduleName + 'NgFactory';

    ops.push(
      new ReplaceNodeOperation(sourceFile, moduleUsageNode, ts.createIdentifier(moduleNameModifier))
    );

    // now we need modify import (*.module to *.module.ngfactory)
    const importToModify = allImports.find(importDeclaration => {
      return collectDeepNodes(importDeclaration, ts.SyntaxKind.Identifier).find(identifier => {
        return identifier.text === importDeclarationName
      });
    });

    if (!importToModify) {
      return;
    }

    // find string literal to change
    const identifierToChange = collectDeepNodes(importToModify, ts.SyntaxKind.StringLiteral)[0];

    if (!identifierToChange) {
      return;
    }

    // get new import path (it would be changed like my.module to my.module.ngfactory)
    const newImportPath = ts.createStringLiteral(identifierToChange.text+'.ngfactory');

    ops.push(
      new ReplaceNodeOperation(sourceFile, identifierToChange, )
    );
  });

  return ops;
}

// from @angular/devkit (AngularCompilerPlugin)
function OPERATION_KIND() {
}

function ReplaceNodeOperation(sourceFile, target, replacement) {
  this.kind = OPERATION_KIND.REPLACE;
  this.sourceFile = sourceFile;
  this.target = target;
  this.replacement = replacement;
}

function applyTransformations(node, transformations, context) {
  const removeTransformations = transformations.filter(
    op => op.kind === OPERATION_KIND.REMOVE,
  );
  const addTransformations = transformations.filter(op => op.kind === OPERATION_KIND.ADD);
  const replaceTransformations = transformations.filter(
    op => op.kind === OPERATION_KIND.REPLACE,
  );

  const visitor = node => {
    let modified = false;
    let modifiedNodes = [node];
    // Check if node should be dropped.
    if (removeTransformations.find(op => op.target === node)) {
      modifiedNodes = [];
      modified = true;
    }

    // Check if node should be replaced (only replaces with first op found).
    const replace = replaceTransformations.find(op => op.target === node);
    if (replace) {
      modifiedNodes = [replace.replacement];
      modified = true;
    }

    // Check if node should be added to.
    const add = addTransformations.filter(op => op.target === node);
    if (add.length > 0) {
      modifiedNodes = [
        ...add.filter(op => op.before).map(op => op.before),
        ...modifiedNodes,
        ...add.filter(op => op.after).map(op => op.after),
      ];
      modified = true;
    }

    // If we changed anything, return modified nodes without visiting further.
    if (modified) {
      return modifiedNodes;
    } else {
      // Otherwise return node as is and visit children.
      return ts.visitEachChild(node, visitor, context);
    }
  };

  // Don't visit the sourcefile at all if we don't have ops for it.
  if (transformations.length === 0) {
    return node;
  }

  const result = ts.visitNode(node, visitor);

  // If we removed any decorators, we need to clean up the decorator arrays.
  if (removeTransformations.some(op => op.target.kind === ts.SyntaxKind.Decorator)) {
    cleanupDecorators(result);
  }

  return result;
}

function collectDeepNodes(
  node,
  kind,
) {
  const kinds = Array.isArray(kind) ? kind : [kind];
  const nodes = [];
  const helper = (child) => {
    if (kinds.includes(child.kind)) {
      nodes.push(child);
    }
    ts.forEachChild(child, helper);
  };
  ts.forEachChild(node, helper);

  return nodes;
}

// from
function cleanupDecorators(node) {
  if (node.decorators && node.decorators.length === 0) {
    node.decorators = undefined;
  }

  ts.forEachChild(node, node => cleanupDecorators(node));
}
