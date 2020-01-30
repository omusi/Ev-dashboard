import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidatorFn, Validators } from '@angular/forms';
import { TableColumnDef, TableDef, TableEditType } from 'app/types/Table';
import { Tag } from 'app/types/Tag';
import { SpinnerService } from '../../../services/spinner.service';
import { EditableTableDataSource } from '../../../shared/table/editable-table-data-source';

@Injectable()
export class UserTagsTableDataSource extends EditableTableDataSource<Tag> {
  constructor(public spinnerService: SpinnerService) {
    super(spinnerService);
  }

  public buildTableDef(): TableDef {
    return {
      isEditable: true,
      rowFieldNameIdentifier: 'id',
      errorMessage: 'users.missing_tag',
    };
  }

  setContent(content: Tag[]) {
    if (content.length === 0) {
      const tag = this.addData();
      tag.id = this.generateTagID();
      tag.issuer = true;
      content.push(tag);
    }
    super.setContent(content);
  }

  public buildTableColumnDefs(): TableColumnDef[] {
    return [
      {
        id: 'id',
        name: 'tags.id',
        editType: TableEditType.INPUT,
        validators: [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
        unique: true,
        errorMessage: 'users.invalid_tag_id',
        headerClass: 'text-left col-30p',
        class: 'text-left col-30p',
      },
      {
        id: 'description',
        unique: true,
        name: 'general.description',
        editType: TableEditType.INPUT,
        headerClass: 'text-left col-50p',
        class: 'text-left col-50p',
      },
      {
        id: 'issuer',
        name: 'tags.issuer',
        editType: TableEditType.RADIO_BUTTON,
        headerClass: 'col-15p',
        class: 'text-center col-15p',
      },
    ];
  }

  public addData() {
    return {
      id: '',
      key: '',
      description: '',
      issuer: false,
    };
  }

  private generateTagID() {
    return 'VB' + Math.floor((Math.random() * 2147483648) + 1);
  }
}
