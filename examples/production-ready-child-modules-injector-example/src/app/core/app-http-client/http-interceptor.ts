import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject, Optional } from '@angular/core';
import { CUSTOM_INJECTOR_TOKEN } from '../../tokens';

export class AppHttpInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(CUSTOM_INJECTOR_TOKEN) private customInjectorToken: string) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>> intercept, token is:', this.customInjectorToken, ', and url is:', req.url);
    return next.handle(req);
  }
}

export const AppHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AppHttpInterceptor
};


export class AnotherHttpInterceptor {
  intercept(req, next) {
    // console.log('>> common request interceptor', req.url);
    return next.handle(req);
  }
}

export const AnotherHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AnotherHttpInterceptor
};
