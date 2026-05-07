import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardStats, BalancePerAccountType, MonthlyOperations } from '../model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${environment.backendHost}/dashboard/stats`);
  }

  getBalancePerAccountType(): Observable<BalancePerAccountType> {
    return this.http.get<BalancePerAccountType>(`${environment.backendHost}/dashboard/balance-per-account-type`);
  }

  getLast12MonthsOperations(): Observable<MonthlyOperations> {
    return this.http.get<MonthlyOperations>(`${environment.backendHost}/dashboard/last-12-months-operations`);
  }
}
