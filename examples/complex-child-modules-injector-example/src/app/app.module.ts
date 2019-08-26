import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule } from './shared/api/api.module';
import { EagerModule } from './eager/eager.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EagerModule,
    BrowserModule,
    ApiModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
