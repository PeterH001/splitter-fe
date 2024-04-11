import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenErrorComponent } from './forbidden-error/forbidden-error.component';



@NgModule({
  declarations: [
    ForbiddenErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorModule { }
