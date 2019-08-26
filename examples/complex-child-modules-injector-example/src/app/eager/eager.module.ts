import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EagerComponent } from './eager/eager.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EagerComponent],
  exports: [EagerComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class EagerModule {
}
