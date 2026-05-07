// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

// Composants standalone (importés, non déclarés)
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,      // non-standalone
    NewCustomerComponent, // non-standalone
    LoginComponent        // non-standalone
  ],
  imports: [
    BrowserModule,
    CommonModule,          // fournit *ngIf, *ngFor aux composants non-standalone
    AppRoutingModule,      // fournit RouterOutlet
    HttpClientModule,
    ReactiveFormsModule,   // fournit formGroup, etc.
    // Composants standalone (obligatoire)
    CustomersComponent,
    AccountsComponent,
    CustomerAccountsComponent,
    DashboardComponent,
    ChangePasswordComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
