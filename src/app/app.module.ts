import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule } from './shared/api/api.module';
import { BusinessModule  } from './business-module/business.module';
import { CUSTOM_INJECTOR_TOKEN } from './tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BusinessModule,
    BrowserModule,
    ApiModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: CUSTOM_INJECTOR_TOKEN, useValue: 'root' }]
})
export class AppModule { }
