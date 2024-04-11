import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { CardComponent } from './card/card.component';
import { GroupsComponent } from './groups/groups.component';
import { ExpenseModule } from '../expense/expense.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from '../user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { PaymentCardComponent } from './payment-card/payment-card.component';



@NgModule({
  declarations: [
    GroupDetailsComponent,
    CardComponent,
    GroupsComponent,
    CreateGroupComponent,
    EditGroupComponent,
    PaymentCardComponent,
  ],
  imports: [
    CommonModule,
    ExpenseModule,
    FormsModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class GroupModule { }
