const angularConfig = require('./angular');
const PROJECT_NAME = "ng-custom-injector-modules";

module.exports = function(aot) {
  const precompiled = {};
  const postfix = aot ? '.ngfactory' : '';
  const { lazyModules } = angularConfig.projects[PROJECT_NAME].architect.build.options;

  lazyModules.forEach(module => {
    const pathParts = module.split('/');
    const moduleName = pathParts[pathParts.length - 1].replace('.', '-');

    precompiled[toPascalCase(moduleName).replace(/-/g, '')] = module + postfix;
  });

  console.log('>>> preco', precompiled)

  // in aot output will be
  // {
  //     WithCustomInjectorModule:'src/app/with-custom-injector/with-custom-injector.module.ngfactory',
  //     AnotherModuleWithCustomInjectorModule:'src/app/another-module-with-custom-injector/another-module-with-custom-injector.module.ngfactory'
  // }


  return precompiled;
};

function toPascalCase(s) {
  return s.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
}
