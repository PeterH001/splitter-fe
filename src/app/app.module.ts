import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorProvider } from './auth/auth.interceptor';
import { GroupModule } from './group/group.module';
import { ExpenseModule } from './expense/expense.module';
import { DebtModule } from './debt/debt.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BalanceModule } from './balance/balance.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    GroupModule,
    ExpenseModule,
    DebtModule,
    UserModule,
    BalanceModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
