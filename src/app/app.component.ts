import {
  AfterViewInit,
  Component,
  Injector,
  NgModuleFactory,
  NgModuleFactoryLoader,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { WithCustomInjectorComponent } from './with-custom-injector/with-custom-injector/with-custom-injector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'ng-custom-injector-modules';

  @ViewChild('testOutlet', {read: ViewContainerRef}) testOutlet: ViewContainerRef;
  constructor(
    private loader: NgModuleFactoryLoader,
    private injector: Injector
  ) {}

  ngAfterViewInit(): void {
    const path = 'src/app/with-custom-injector/with-custom-injector.module#WithCustomInjectorModule';
    this.loader.load(path).then((moduleFactory: NgModuleFactory<any>) => {
      const moduleRef = moduleFactory.create(this.injector);
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(WithCustomInjectorComponent);
      this.testOutlet.createComponent(compFactory);
    });
  }
}
