import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AppHttpClientModule } from '../../core/app-http-client/app-http-client.module';



@NgModule({
  imports: [
    CommonModule,
    AppHttpClientModule
  ],
  exports: [ AppHttpClientModule ],
  providers: [ ApiService ]
})
export class ApiModule { }
