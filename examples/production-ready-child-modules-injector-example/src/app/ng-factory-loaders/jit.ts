import {Compiler, NgModuleFactory} from '@angular/core';

export function load(ngModuleWebpackModule: any, compiler: Compiler): [string, NgModuleFactory<any>] {
  const moduleName = Object.keys(ngModuleWebpackModule).find(key => key.endsWith('Module'));

  return [moduleName, compiler.compileModuleSync(ngModuleWebpackModule[moduleName])];
}
