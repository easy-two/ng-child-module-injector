import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule } from './shared/api/api.module';
import { ChildInjectorModule } from './core/child-injector/child-injector.module';

// here we use webpack aliases for our modules
// @ts-ignore
import * as WithCustomInjectorModule from 'WithCustomInjectorModule';
// @ts-ignore
import * as AnotherModuleWithCustomInjectorModule from 'AnotherModuleWithCustomInjectorModule';

import {WithCustomInjectorComponent} from './with-custom-injector/with-custom-injector/with-custom-injector.component';
import {
  AnotherComponentWithCustomInjectorComponent
} from './another-module-with-custom-injector/another-component-with-custom-injector/another-component-with-custom-injector.component';

// these factories are required by ng compiler
export function WithCustomInjectorModuleFactory() {
  return WithCustomInjectorModule;
}
export function AnotherModuleWithCustomInjectorModuleFactory() {
  return AnotherModuleWithCustomInjectorModule;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    ChildInjectorModule.forModules([
      [WithCustomInjectorModuleFactory, WithCustomInjectorComponent],
      [AnotherModuleWithCustomInjectorModuleFactory, AnotherComponentWithCustomInjectorComponent]
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
