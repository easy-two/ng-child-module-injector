import {NgModuleFactory} from '@angular/core';

export function load(ngModuleWebpackModule: any): [string, NgModuleFactory<any>] {
  const moduleName = ngModuleWebpackModule.moduleType.name;

  return [moduleName, ngModuleWebpackModule];
}
