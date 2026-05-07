// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { Chart } from 'chart.js/auto';
import { DashboardStats, BalancePerAccountType, MonthlyOperations } from '../model/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats!: DashboardStats;
  balancePerType!: BalancePerAccountType;
  monthlyOps!: MonthlyOperations;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(data => this.stats = data);
    this.dashboardService.getBalancePerAccountType().subscribe(data => {
      this.balancePerType = data;
      this.renderPieChart();
    });
    this.dashboardService.getLast12MonthsOperations().subscribe(data => {
      this.monthlyOps = data;
      this.renderLineChart();
    });
  }

  renderPieChart() {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Current Accounts', 'Saving Accounts'],
        datasets: [{
          data: [this.balancePerType.CurrentAccount, this.balancePerType.SavingAccount],
          backgroundColor: ['#42A5F5', '#FFA726']
        }]
      }
    });
  }

  renderLineChart() {
    const months = Object.keys(this.monthlyOps['debits']);
    const debits = months.map(m => this.monthlyOps['debits'][m]);
    const credits = months.map(m => this.monthlyOps['credits'][m]);
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          { label: 'Debits', data: debits, borderColor: '#FF6384', tension: 0.1 },
          { label: 'Credits', data: credits, borderColor: '#36A2EB', tension: 0.1 }
        ]
      }
    });
  }
}
