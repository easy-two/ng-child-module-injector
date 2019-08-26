import {Compiler, NgModuleFactory} from '@angular/core';

export function load(ngModuleWebpackModule: any, compiler: Compiler): NgModuleFactory<any> {
  const moduleName = Object.keys(ngModuleWebpackModule).find(key => key.endsWith('Module'));

  return compiler.compileModuleSync(ngModuleWebpackModule[moduleName]);
}
