import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FindUserTypeaheadComponent } from './find-user-typeahead/find-user-typeahead.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [
    UserComponent,
    FindUserTypeaheadComponent,
    EditMyProfileComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FindUserTypeaheadComponent
  ]
})
export class UserModule { }
