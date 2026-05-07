// customer-accounts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, BankAccount } from '../model/account.model';
import { AccountsService } from '../services/accounts.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customer!: Customer;
  accounts: BankAccount[] = [];
  accountForm!: FormGroup;
  showForm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountsService,
    private fb: FormBuilder
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (!this.customer && id) {
      // fallback: chargez le client si nécessaire
    }
    this.loadAccounts();

    this.accountForm = this.fb.group({
      type: ['CURRENT', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      overDraft: [0],
      interestRate: [0]
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe(accounts => {
      this.accounts = accounts.filter(acc => acc.customerDTO?.id === this.customer.id);
    });
  }

  deleteAccount(accountId: string) {
    if (confirm('Delete this account?')) {
      this.accountService.deleteAccount(accountId).subscribe(() => this.loadAccounts());
    }
  }

  openCreateForm() {
    this.showForm = true;
  }

  saveAccount() {
    const val = this.accountForm.value;
    if (val.type === 'CURRENT') {
      this.accountService.saveCurrentAccount(val.initialBalance, val.overDraft, this.customer.id)
        .subscribe(() => { this.showForm = false; this.loadAccounts(); });
    } else {
      this.accountService.saveSavingAccount(val.initialBalance, val.interestRate, this.customer.id)
        .subscribe(() => { this.showForm = false; this.loadAccounts(); });
    }
  }
}
