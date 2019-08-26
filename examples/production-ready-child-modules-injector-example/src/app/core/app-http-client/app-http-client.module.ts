import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AnotherHttpInterceptorProvider,
  AppHttpInterceptorProvider
} from './http-interceptor';



@NgModule({
  exports: [ HttpClientModule ],
  imports: [
    HttpClientModule
  ],
  providers: [
    AnotherHttpInterceptorProvider,
    AppHttpInterceptorProvider
  ]
})
export class AppHttpClientModule { }
