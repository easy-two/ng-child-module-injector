import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business/business.component';
import { CUSTOM_INJECTOR_TOKEN } from '../tokens';
import { ApiModule } from '../shared/api/api.module';
import { AnotherBusinessModule } from '../another-business-module/another-business.module';

@NgModule({
  declarations: [BusinessComponent],
  entryComponents: [BusinessComponent],
  imports: [
    AnotherBusinessModule,
    CommonModule,
    ApiModule
  ],
  exports: [
    BusinessComponent
  ],
  providers: [
    {provide: CUSTOM_INJECTOR_TOKEN, useValue: 'business'}
  ]
})
export class BusinessModule { }
