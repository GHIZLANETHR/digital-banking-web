import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails, BankAccount } from '../model/account.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${environment.backendHost}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`);
  }

  public debit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${environment.backendHost}/accounts/debit`, { accountId, amount, description });
  }

  public credit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${environment.backendHost}/accounts/credit`, { accountId, amount, description });
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${environment.backendHost}/accounts/transfer`, { accountSource, accountDestination, amount, description });
  }

  // Nouvelles méthodes pour l'administration des comptes
  public getAllAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${environment.backendHost}/accounts`);
  }

  public searchAccounts(keyword?: string, type?: string, status?: string): Observable<BankAccount[]> {
    let params = new HttpParams();
    if (keyword) params = params.set('keyword', keyword);
    if (type) params = params.set('type', type);
    if (status) params = params.set('status', status);
    return this.http.get<BankAccount[]>(`${environment.backendHost}/accounts/search`, { params });
  }

  public deleteAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/accounts/${accountId}`);
  }

  public saveCurrentAccount(initialBalance: number, overDraft: number, customerId: number): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${environment.backendHost}/customers/${customerId}/current-account`, { initialBalance, overDraft });
  }

  public saveSavingAccount(initialBalance: number, interestRate: number, customerId: number): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${environment.backendHost}/customers/${customerId}/saving-account`, { initialBalance, interestRate });
  }
}
