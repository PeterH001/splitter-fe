import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminUserCardComponent } from './admin-user-card/admin-user-card.component';
import { AdminGroupCardComponent } from './admin-group-card/admin-group-card.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminGroupsComponent,
    AdminUsersComponent,
    AdminUserCardComponent,
    AdminGroupCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
