import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../services/authorization-service';
import {TransactionsHistoryDataSource} from './transactions-history-data-source-table';
import {MessageService} from '../../../services/message.service';
import { CentralServerService } from 'app/services/central-server.service';
import { WindowService } from '../../../services/window.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: 'transactions-history.component.html',
  providers: [
    TransactionsHistoryDataSource
  ]
})
export class TransactionsHistoryComponent implements OnInit {
  public isAdmin;

  constructor(
    public transactionsHistoryDataSource: TransactionsHistoryDataSource,
    private windowService: WindowService,
    private authorizationService: AuthorizationService,
    private centralServerService: CentralServerService,
    private messageService: MessageService
  ) {
    this.isAdmin = this.authorizationService.isAdmin();
    this.transactionsHistoryDataSource.forAdmin(this.isAdmin);
  }

  ngOnInit(): void {
    // Check if transaction ID id provided
    const transactionID = this.windowService.getSearch('TransactionID');
    if (transactionID) {
      this.centralServerService.getTransaction(transactionID).subscribe(transaction => {
        // Found
        this.transactionsHistoryDataSource.openSession(transaction);
      }, (error) => {
        // Not Found
        this.messageService.showErrorMessage('transactions.transaction_id_not_found', {'sessionID': transactionID});
      });
      // Clear Search
      this.windowService.deleteSearch('TransactionID');
    }
  }
}
