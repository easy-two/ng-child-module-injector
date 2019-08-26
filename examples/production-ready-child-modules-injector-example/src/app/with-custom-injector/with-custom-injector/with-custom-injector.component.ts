import {
  AfterViewInit,
  Compiler,
  Component, Inject,
  Injector, Input,
  NgModuleFactoryLoader, Optional,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
// @ts-ignore
import * as anotherCustomInjectorModule from 'anotherCustomInjectorModule';
import { AnotherComponentWithCustomInjectorComponent } from '../../another-module-with-custom-injector/another-component-with-custom-injector/another-component-with-custom-injector.component';
// @ts-ignore
import { load } from 'ngFactoryLoader';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_INJECTOR_TOKEN } from '../../tokens';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-with-custom-injector',
  templateUrl: './with-custom-injector.component.html',
  styleUrls: ['./with-custom-injector.component.css']
})
export class WithCustomInjectorComponent {
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) token: string
  ) {
    // console.log('>> token with custom injector value is:', token);
    apiService.doRequest('/with-custom-injector-request').subscribe(() => {}, () => {});
  }

  @Input() message;
}
