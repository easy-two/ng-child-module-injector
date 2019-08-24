import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotherBusinessComponent } from './another-business-component/another-business.component';
import { CUSTOM_INJECTOR_TOKEN } from '../tokens';
import { ApiModule } from '../shared/api/api.module';

@NgModule({
  declarations: [AnotherBusinessComponent],
  entryComponents: [AnotherBusinessComponent],
  imports: [
    CommonModule,
    ApiModule
  ],
  exports: [
    AnotherBusinessComponent
  ],
  providers: [
    {provide: CUSTOM_INJECTOR_TOKEN, useValue: 'another-business'}
  ]
})
export class AnotherBusinessModule { }
