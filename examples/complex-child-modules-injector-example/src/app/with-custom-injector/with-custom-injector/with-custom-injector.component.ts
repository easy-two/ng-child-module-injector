import {
  AfterViewInit,
  Compiler,
  Component, Inject,
  Injector,
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
export class WithCustomInjectorComponent implements AfterViewInit {
  @ViewChild('testOutlet', { read: ViewContainerRef, static: true }) testOutlet: ViewContainerRef;
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private apiService: ApiService,
    @Optional() @Inject(CUSTOM_INJECTOR_TOKEN) token: string
  ) {
    // console.log('>> token with custom injector value is:', token);
    apiService.doRequest('/with-custom-injector-request').subscribe(() => {}, () => {});
  }

  ngAfterViewInit(): void {
    const moduleFactory = load('AnotherModuleWithCustomInjectorModule', anotherCustomInjectorModule, this.compiler);
    const moduleRef = moduleFactory.create(this.injector);
    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(AnotherComponentWithCustomInjectorComponent);
    this.testOutlet.createComponent(compFactory);
  }
}
