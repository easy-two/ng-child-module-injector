import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithCustomInjectorComponent } from './with-custom-injector/with-custom-injector.component';

@NgModule({
  declarations: [WithCustomInjectorComponent],
  entryComponents: [WithCustomInjectorComponent],
  imports: [
    CommonModule
  ]
})
export class WithCustomInjectorModule { }
