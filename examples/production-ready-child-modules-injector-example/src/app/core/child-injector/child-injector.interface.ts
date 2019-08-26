import { NgModuleRef } from '@angular/core';

export type ICustomInjectorModule = [any, any];
export type IChildInjectorModules = Array<ICustomInjectorModule>;
export interface ICustomInjectorCompiledModule {
  name: string;
  module: NgModuleRef<any>;
  component: any;
}
export type IChildInjectorCompiledModules = Array<ICustomInjectorCompiledModule>;
