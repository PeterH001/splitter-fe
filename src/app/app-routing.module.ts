import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { CardComponent } from './group/card/card.component';
import { GroupsComponent } from './group/groups/groups.component';
import { ExpenseCardComponent } from './expense/expense-card/expense-card.component';
import { ExpensesComponent } from './expense/expenses/expenses.component';
import { ExpenseDetailsComponent } from './expense/expense-details/expense-details.component';
import { GroupDetailsComponent } from './group/group-details/group-details.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { CreateExpenseComponent } from './expense/create-expense/create-expense.component';
import { DebtsComponent } from './debt/debts/debts.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';
import { AdminGroupsComponent } from './admin/admin-groups/admin-groups.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ForbiddenErrorComponent } from './error/forbidden-error/forbidden-error.component';
import { BalanceComponent } from './balance/balance/balance.component';
import { SettleUpComponent } from './balance/settle-up/settle-up.component';

const routes: Routes = [
  { path: 'debts', component: DebtsComponent }, 
  { path: 'card', component: CardComponent }, 
  { path: 'groups', component: GroupsComponent }, 
  { path: 'groupdetails/:id', component: GroupDetailsComponent }, 
  { path: 'creategroup', component: CreateGroupComponent }, 
  { path: 'expensecard', component: ExpenseCardComponent }, 
  { path: 'expenses', component: ExpensesComponent }, 
  { path: 'group/:id/addexpense', component: CreateExpenseComponent }, 
  { path: 'group/:id/edit', component: EditGroupComponent }, 
  { path: 'group/:id/balances', component: BalanceComponent }, 
  { path: 'settleup', component: SettleUpComponent }, 
  // { path: 'balances', component: BalanceComponent }, 
  { path: 'expensedetails/:id', component: ExpenseDetailsComponent }, 
  { path: 'expense/:id/edit', component: EditExpenseComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'user', component: UserComponent }, 
  { path: 'edituser', component: EditProfileComponent }, 
  { path: 'admin', component: AdminComponent }, 
  { path: 'admin/groups', component: AdminGroupsComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'error/forbidden', component: ForbiddenErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }