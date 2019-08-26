import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  Optional,
  ViewContainerRef,
  Input,
  ComponentRef,
  ComponentFactory, OnDestroy, OnChanges, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CHILD_INJECTOR_COMPILED_MODULES } from './child-injector-tokens';
import { IChildInjectorCompiledModules } from './child-injector.interface';

@Component({
  selector: 'app-child-injector',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildInjectorComponent<T> implements OnInit, OnChanges, OnDestroy {
  constructor(
    @Optional() @Inject(CHILD_INJECTOR_COMPILED_MODULES) private compiledModules: IChildInjectorCompiledModules,
    private vc: ViewContainerRef
  ) {}

  // tslint:disable-next-line:no-input-rename
  @Input('module') moduleName: string;
  // tslint:disable-next-line:no-input-rename
  @Input('class') className: string;
  @Input() inputs: any = {};
  @Input() outputs: any = {};

  sub: Subscription = new Subscription();
  componentRef: ComponentRef<T>;

  ngOnInit() {
    const { module, component } = this.compiledModules.find(m => m.name === this.moduleName);
    const factory: ComponentFactory<T> = module.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.vc.createComponent(factory);
    const { instance, location } = this.componentRef;

    if (this.className) {
      const classNames = this.className.split(' ');
      classNames.forEach(className => location.nativeElement.classList.add(className));
    }

    this.setInputs(instance);
    this.setOutputs(instance);
  }

  ngOnChanges(changes) {
    if (!this.componentRef) {
      return;
    }
    if (changes.inputs) {
      this.setInputs(this.componentRef.instance);
    }
    if (changes.outputs) {
      this.setOutputs(this.componentRef.instance);
    }
  }

  setInputs(instance: T): void {
    Object.assign(instance, this.inputs);
    if ((instance as any).ngOnChanges) {
      (instance as any).ngOnChanges({ ...this.inputs });
    }
    this.componentRef.changeDetectorRef.markForCheck();
  }

  setOutputs(instance: T): void {
    this.sub.unsubscribe();
    const outputKeys = Object.keys(this.outputs);

    outputKeys.forEach((key) => {
      this.sub.add(instance[key].subscribe(this.outputs[key]));
    });
  }

  ngOnDestroy() {
    this.vc.clear();
    this.sub.unsubscribe();
  }
}
