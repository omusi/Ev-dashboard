import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserSitesDataSource } from './user-sites-data-source-table';


@Component({
  selector: 'app-user-sites-dialog-cmp',
  templateUrl: 'user-sites.dialog.component.html'
})
export class UserSitesDialogComponent {

  constructor(
    public userSitesDataSource: UserSitesDataSource,
    private dialogRef: MatDialogRef<UserSitesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    if (data) {
      this.userSitesDataSource.setUser(data);
    }
  }
}
