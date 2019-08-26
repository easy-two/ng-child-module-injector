import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithCustomInjectorComponent } from './with-custom-injector/with-custom-injector.component';
import { CUSTOM_INJECTOR_TOKEN } from '../tokens';
import { ApiModule } from '../shared/api/api.module';
import {ChildInjectorModule} from '../core/child-injector/child-injector.module';

// @ts-ignore
import * as WithCustomInjectorInnerModule from 'WithCustomInjectorInnerModule';
import {
  WithCustomInjectorInnerComponent
} from './with-custom-injector/with-custom-injector-inner/with-custom-injector-inner/with-custom-injector-inner.component';

export function WithCustomInjectorInnerModuleFactory() {
  return WithCustomInjectorInnerModule;
}

@NgModule({
  declarations: [WithCustomInjectorComponent],
  entryComponents: [WithCustomInjectorComponent],
  imports: [
    CommonModule,
    ApiModule,
    ChildInjectorModule.forModules([
      [WithCustomInjectorInnerModuleFactory, WithCustomInjectorInnerComponent]
    ])
  ],
  providers: [
    { provide: CUSTOM_INJECTOR_TOKEN, useValue: 'with-custom-injector' }
  ]
})
export class WithCustomInjectorModule { }
