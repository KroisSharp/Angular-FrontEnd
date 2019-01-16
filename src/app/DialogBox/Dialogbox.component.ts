import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


export interface DialogData {
    errorCode: string;
    errorMessage: string;
  }

//dialog
@Component({
    selector: 'Dialogbox.component-dialog',
    templateUrl: 'Dialogbox.component-dialog.html',
  })
  export class Dialogboxcomponent {
  
    constructor(
      public dialogRef: MatDialogRef<Dialogboxcomponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }


  }