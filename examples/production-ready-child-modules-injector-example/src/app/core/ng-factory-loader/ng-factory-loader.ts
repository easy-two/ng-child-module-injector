import { Compiler, NgModuleFactory } from '@angular/core';

export function load(ngModuleWebpackModule: any, compiler: Compiler) {
  const offlineMode = compiler instanceof Compiler;
  return offlineMode
    // in AOT we just resolve NgFactory
    ? loadFactory(ngModuleWebpackModule)
    // in JIT we have to compile NgFactory
    : loadAndCompileFactory(ngModuleWebpackModule, compiler);
}

function loadAndCompileFactory(ngModuleWebpackModule: any, compiler: Compiler): [string, NgModuleFactory<any>] {
  // does not work in jit with --optimization at the moment
  const moduleName = ngModuleWebpackModule.name;

  return [moduleName, compiler.compileModuleSync(ngModuleWebpackModule)];
}

function loadFactory(ngModuleWebpackModule: any): [string, NgModuleFactory<any>] {
  const moduleName = Object.keys(ngModuleWebpackModule).find(key => key.endsWith('ModuleNgFactory'));

  return [moduleName.replace('NgFactory', ''), ngModuleWebpackModule[moduleName]];
}
