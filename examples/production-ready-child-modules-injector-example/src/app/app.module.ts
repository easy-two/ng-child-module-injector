import { WithCustomInjectorModule } from './with-custom-injector/with-custom-injector.module';
import { AnotherModuleWithCustomInjectorModule } from './another-module-with-custom-injector/another-module-with-custom-injector.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ApiModule } from './shared/api/api.module';
import { ChildInjectorModule } from '@easy-two/ngx-child-injector';
import { CUSTOM_INJECTOR_TOKEN } from './tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    ChildInjectorModule.forModules([
      WithCustomInjectorModule, AnotherModuleWithCustomInjectorModule
    ])
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: CUSTOM_INJECTOR_TOKEN, useValue: 'root' }
  ]
})
export class AppModule { }
