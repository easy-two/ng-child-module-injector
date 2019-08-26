import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AnotherHttpInterceptorWhichMustBeInRootAndSoooqaLoggedEverywhereInAnyFuckingLazyModuleProvider,
  AppHttpInterceptorProvider
} from './http-interceptor';



@NgModule({
  exports: [ HttpClientModule ],
  imports: [
    HttpClientModule
  ],
  providers: [
    AnotherHttpInterceptorWhichMustBeInRootAndSoooqaLoggedEverywhereInAnyFuckingLazyModuleProvider,
    AppHttpInterceptorProvider
  ]
})
export class AppHttpClientModule { }
