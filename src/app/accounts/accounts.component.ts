// accounts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { AccountDetails, BankAccount } from '../model/account.model';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  currentPage = 0;
  pageSize = 5;
  accountDetails$!: Observable<AccountDetails>;
  accounts$!: Observable<BankAccount[]>;
  errorMessage = '';
  operationFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({ accountId: [''] });
    this.searchFormGroup = this.fb.group({ keyword: [''], type: [''], status: [''] });
    this.operationFormGroup = this.fb.group({
      operationType: [null],
      amount: [0],
      description: [''],
      accountDestination: ['']
    });
    this.loadAllAccounts();
  }

  loadAllAccounts() {
    this.accounts$ = this.accountService.getAllAccounts().pipe(
      catchError(err => { this.errorMessage = err.message; return throwError(err); })
    );
  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.accountDetails$ = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => { this.errorMessage = err.message; return throwError(err); })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId = this.accountFormGroup.value.accountId;
    let op = this.operationFormGroup.value;
    if (op.operationType === 'DEBIT') {
      this.accountService.debit(accountId, op.amount, op.description).subscribe(() => {
        alert('Debit success');
        this.handleSearchAccount();
      });
    } else if (op.operationType === 'CREDIT') {
      this.accountService.credit(accountId, op.amount, op.description).subscribe(() => {
        alert('Credit success');
        this.handleSearchAccount();
      });
    } else if (op.operationType === 'TRANSFER') {
      this.accountService.transfer(accountId, op.accountDestination, op.amount, op.description).subscribe(() => {
        alert('Transfer success');
        this.handleSearchAccount();
      });
    }
  }

  advancedSearch() {
    let { keyword, type, status } = this.searchFormGroup.value;
    this.accounts$ = this.accountService.searchAccounts(keyword, type, status);
  }

  deleteAccount(accountId: string) {
    if (confirm('Delete this account?')) {
      this.accountService.deleteAccount(accountId).subscribe(() => this.loadAllAccounts());
    }
  }
}
