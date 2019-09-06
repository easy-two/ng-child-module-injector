import { Compiler, Injector, ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildInjectorComponent } from './child-injector.component';
import { CHILD_INJECTOR_MODULES, CHILD_INJECTOR_COMPILED_MODULES } from './child-injector-tokens';
import { NgFactoryResolver } from '../ng-factory-resolver/ng-factory-resolver';
import { IChildInjectorModules } from './child-injector.interface';

@NgModule({
  imports: [CommonModule],
  declarations: [ChildInjectorComponent],
  entryComponents: [ChildInjectorComponent],
  exports: [ChildInjectorComponent]
})
export class ChildInjectorModule {
  static forModules(modules: IChildInjectorModules): ModuleWithProviders {
    return {
      ngModule: ChildInjectorModule,
      providers: [
        {
          provide: CHILD_INJECTOR_MODULES,
          useValue: modules
        },
        {
          provide: CHILD_INJECTOR_COMPILED_MODULES,
          useFactory: childInjectorModulesFactory,
          deps: [CHILD_INJECTOR_MODULES, Compiler, Injector]
        }
      ]
    };
  }
}

export function childInjectorModulesFactory(
  modules: IChildInjectorModules,
  compiler: Compiler,
  injector: Injector
): any {
  return modules.map(([ngModuleWebpackModule, component]) => {
    const [name, factory]: [string, NgModuleFactory<any>] = NgFactoryResolver.resolve(ngModuleWebpackModule, compiler);
    const module = factory.create(injector);

    return { name, module, component };
  });
}
