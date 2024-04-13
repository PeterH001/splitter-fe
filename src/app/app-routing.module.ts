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
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'debts', component: DebtsComponent, canActivate: [loggedInGuard]  }, 
  { path: 'card', component: CardComponent, canActivate: [loggedInGuard]  }, 
  { path: 'groups', component: GroupsComponent, canActivate: [loggedInGuard]  }, 
  { path: 'groupdetails/:id', component: GroupDetailsComponent, canActivate: [loggedInGuard]  }, 
  { path: 'creategroup', component: CreateGroupComponent, canActivate: [loggedInGuard]  }, 
  { path: 'expensecard', component: ExpenseCardComponent, canActivate: [loggedInGuard]  }, 
  { path: 'expenses', component: ExpensesComponent, canActivate: [loggedInGuard]  }, 
  { path: 'group/:id/addexpense', component: CreateExpenseComponent, canActivate: [loggedInGuard] }, 
  { path: 'group/:id/edit', component: EditGroupComponent, canActivate: [loggedInGuard]  }, 
  { path: 'group/:id/balances', component: BalanceComponent, canActivate: [loggedInGuard]  }, 
  { path: 'settleup', component: SettleUpComponent, canActivate: [loggedInGuard]  }, 
  { path: 'expensedetails/:id', component: ExpenseDetailsComponent, canActivate: [loggedInGuard]  }, 
  { path: 'expense/:id/edit', component: EditExpenseComponent, canActivate: [loggedInGuard]  }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'user', component: UserComponent, canActivate: [loggedInGuard] }, 
  { path: 'edituser', component: EditProfileComponent, canActivate: [loggedInGuard] }, 
  { path: 'admin', component: AdminComponent, canActivate: [loggedInGuard, adminGuard] }, 
  { path: 'admin/register', component: AdminRegisterComponent }, 
  { path: 'admin/groups', component: AdminGroupsComponent, canActivate: [loggedInGuard, adminGuard] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [loggedInGuard, adminGuard] },
  { path: 'error/forbidden', component: ForbiddenErrorComponent, canActivate: [loggedInGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }