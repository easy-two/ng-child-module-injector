import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnotherComponentWithCustomInjectorComponent
} from './another-component-with-custom-injector/another-component-with-custom-injector.component';
import { CUSTOM_INJECTOR_TOKEN } from '../tokens';
import { ApiModule } from '../shared/api/api.module';

@NgModule({
  declarations: [AnotherComponentWithCustomInjectorComponent],
  entryComponents: [AnotherComponentWithCustomInjectorComponent],
  imports: [
    CommonModule,
    ApiModule
  ],
  providers: [
    { provide: CUSTOM_INJECTOR_TOKEN, useValue: 'another-with-custom-injector' }
  ]
})
export class AnotherModuleWithCustomInjectorModule { }
