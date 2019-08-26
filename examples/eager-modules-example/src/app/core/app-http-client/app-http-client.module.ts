import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  CommonHttpInterceptorProvier,
  AppHttpInterceptorProvider
} from './http-interceptor';



@NgModule({
  exports: [ HttpClientModule ],
  imports: [
    HttpClientModule
  ],
  providers: [
    CommonHttpInterceptorProvier,
    AppHttpInterceptorProvider
  ]
})
export class AppHttpClientModule { }
