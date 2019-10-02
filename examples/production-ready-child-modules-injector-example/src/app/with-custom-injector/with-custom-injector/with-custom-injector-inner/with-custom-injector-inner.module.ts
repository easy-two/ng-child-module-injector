import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithCustomInjectorInnerComponent } from './with-custom-injector-inner/with-custom-injector-inner.component';
import { CUSTOM_INJECTOR_TOKEN } from '../../../tokens';
import { ApiModule } from '../../../shared/api/api.module';
import { ChildInjectorModule } from '@easy-two/ngx-child-injector';

@NgModule({
  declarations: [WithCustomInjectorInnerComponent],
  imports: [
    CommonModule,
    ApiModule,
    ChildInjectorModule.forChildModule([WithCustomInjectorInnerComponent])
  ],
  entryComponents: [WithCustomInjectorInnerComponent],
  providers: [
    { provide: CUSTOM_INJECTOR_TOKEN, useValue: 'inner-with-custom-injector' }
  ],
  exports: [WithCustomInjectorInnerComponent]
})
export class WithCustomInjectorInnerModule { }
