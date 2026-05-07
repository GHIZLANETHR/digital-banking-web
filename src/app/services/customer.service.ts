import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/account.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.backendHost}/customers`);
  }

  public searchCustomers(keyword: string): Observable<Customer[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<Customer[]>(`${environment.backendHost}/customers/search`, { params });
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.backendHost}/customers`, customer);
  }

  public updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.backendHost}/customers/${id}`, customer);
  }

  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/customers/${id}`);
  }

  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.backendHost}/customers/${id}`);
  }
}
