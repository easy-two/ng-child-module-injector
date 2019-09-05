import { Compiler, NgModuleFactory } from '@angular/core';

export function load(ngModuleWebpackModule: any, compiler: Compiler): [string, NgModuleFactory<any>] {
  const moduleName = ngModuleWebpackModule.name;

  return [moduleName, compiler.compileModuleSync(ngModuleWebpackModule)];
}
