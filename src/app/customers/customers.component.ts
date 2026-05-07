// customers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';                // ← pour *ngIf, *ngFor, async
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/account.model';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers$!: Observable<Customer[]>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  selectedCustomer: Customer | null = null;
  editFormGroup!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({ keyword: [''] });
    this.editFormGroup = this.fb.group({ name: [''], email: [''] });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.customers$ = this.customerService.searchCustomers(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      }),
    );
  }

  handleDeleteCustomer(c: Customer) {
    if (confirm('Are you sure to delete this customer?')) {
      this.customerService.deleteCustomer(c.id).subscribe({
        next: () => this.handleSearchCustomers(),
        error: (err) => console.log(err),
      });
    }
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigate(['/customer-accounts', customer.id], { state: customer });
  }

  openEditModal(customer: Customer) {
    this.selectedCustomer = customer;
    this.editFormGroup.patchValue({ name: customer.name, email: customer.email });
  }

  saveEdit() {
    if (this.selectedCustomer) {
      const updated: Customer = {
        ...this.selectedCustomer,
        name: this.editFormGroup.value.name,
        email: this.editFormGroup.value.email,
      };
      this.customerService.updateCustomer(this.selectedCustomer.id, updated).subscribe({
        next: () => {
          this.handleSearchCustomers();
          this.selectedCustomer = null;
        },
        error: (err) => console.log(err),
      });
    }
  }
}
