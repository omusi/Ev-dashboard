import { Data } from './Table';

export enum InvoiceStatus {
  PAID = 'paid',
  UNPAID = 'open',
}

export interface BillingTax extends Data {
  description: string;
  displayName: string;
  percentage: number;
}

export interface BillingUserData extends Data {
  hasSynchroError: boolean;
}

export interface BillingInvoice extends Data {
  status: string;
  amountDue: number;
  currency: string;
  customerID: string;
  date: Date;
}
