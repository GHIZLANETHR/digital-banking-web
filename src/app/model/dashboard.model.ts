export interface DashboardStats {
  totalCustomers: number;
  totalAccounts: number;
  totalBalance: number;
  debitCount: number;
  creditCount: number;
}

export interface BalancePerAccountType {
  CurrentAccount: number;
  SavingAccount: number;
}

export interface MonthlyOperations {
  [key: string]: { [month: string]: number };
}
