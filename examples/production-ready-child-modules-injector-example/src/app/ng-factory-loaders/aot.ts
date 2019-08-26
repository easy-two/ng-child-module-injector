import {NgModuleFactory} from '@angular/core';

export function load(ngModuleWebpackModule: any): NgModuleFactory<any> {
  const moduleName = Object.keys(ngModuleWebpackModule).find(key => key.endsWith('ModuleNgFactory'));

  return ngModuleWebpackModule[moduleName];
}
