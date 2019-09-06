import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithCustomInjectorComponent } from './with-custom-injector/with-custom-injector.component';
import { CUSTOM_INJECTOR_TOKEN } from '../tokens';
import { ApiModule } from '../shared/api/api.module';
import { ChildInjectorModule } from '../core/child-injector/child-injector.module';
import {
  WithCustomInjectorInnerComponent
} from './with-custom-injector/with-custom-injector-inner/with-custom-injector-inner/with-custom-injector-inner.component';
import { WithCustomInjectorInnerModule } from './with-custom-injector/with-custom-injector-inner/with-custom-injector-inner.module';

@NgModule({
  declarations: [WithCustomInjectorComponent],
  entryComponents: [WithCustomInjectorComponent],
  imports: [
    CommonModule,
    ApiModule,
    ChildInjectorModule.forModules([
      [WithCustomInjectorInnerModule, WithCustomInjectorInnerComponent]
    ])
  ],
  providers: [
    { provide: CUSTOM_INJECTOR_TOKEN, useValue: 'with-custom-injector' }
  ]
})
export class WithCustomInjectorModule { }
