export interface AccountDetails {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}

export interface BankAccount {
  id: string;
  balance: number;
  createdAt: Date;
  status: string;
  customerDTO: Customer;
  type: string;
  overDraft?: number;
  interestRate?: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
