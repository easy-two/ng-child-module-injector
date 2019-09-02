import {NgModuleFactory} from '@angular/core';

export function load(ngModuleWebpackModule: any): [string, NgModuleFactory<any>] {
  const moduleName = Object.keys(ngModuleWebpackModule).find(key => key.endsWith('ModuleNgFactory'));

  return [moduleName.replace('NgFactory', ''), ngModuleWebpackModule[moduleName]];
}

