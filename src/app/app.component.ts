import {
  AfterViewInit, Compiler,
  Component,
  Injector,
  NgModuleFactory,
  NgModuleFactoryLoader,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
// @ts-ignore
import * as withCustomInjectorModule from 'withCustomInjectorModule';
import { WithCustomInjectorComponent } from './with-custom-injector/with-custom-injector/with-custom-injector.component';
// @ts-ignore
import { load } from 'ngFactoryLoader';

declare var AOT: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-custom-injector-modules';

  @ViewChild('testOutlet', { read: ViewContainerRef, static: true }) testOutlet: ViewContainerRef;
  constructor(
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    private compiler: Compiler
  ) {}

  ngAfterViewInit(): void {
    const moduleFactory = load('WithCustomInjectorModule', withCustomInjectorModule, this.compiler);
    const moduleRef = moduleFactory.create(this.injector);
    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(WithCustomInjectorComponent);
    this.testOutlet.createComponent(compFactory);
  }
}
