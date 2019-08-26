import {
  AfterViewInit, Compiler,
  Component, Inject,
  Injector,
  NgModuleFactory,
  NgModuleFactoryLoader, Optional,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
// @ts-ignore
import * as withCustomInjectorModule from 'withCustomInjectorModule';
import { WithCustomInjectorComponent } from './with-custom-injector/with-custom-injector/with-custom-injector.component';
// @ts-ignore
import { load } from 'ngFactoryLoader';
import { CUSTOM_INJECTOR_TOKEN } from './tokens';
import { ApiService } from './shared/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-custom-injector-modules';

  @ViewChild('testOutlet', { read: ViewContainerRef, static: true }) testOutlet: ViewContainerRef;
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) token: string
  ) {
    // console.log('>> token in root', token);
    apiService.doRequest('/root-injector-request').subscribe(() => {}, () => {});
  }

  inputs = {
    message: 'hello'
  };
}
