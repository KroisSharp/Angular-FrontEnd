import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { auth } from 'firebase';

export interface DialogData {
  errorCode: string;
  errorMessage: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {



  constructor(private _router: Router,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private Auth: AuthServiceService) { }

  ngOnInit() {
  }
  hide = true; //set password hidden by default
  email = new FormControl('', [Validators.required, Validators.email]);



  emailinvalidMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }




  SignInBtn(Username, Password) {
    this.Auth.DoLogin(Username, Password).catch(err => {
      console.log(err.code)
      this.openErrorDialog(err.code, err.message)
    })
  }

  openErrorDialog(errorcode, errormessage): void {
    const dialogRef = this.dialog.open(SignInComponentDialog, {
      width: '350px',
      data: { errorCode: errorcode, errorMessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }
}

//dialog
@Component({
  selector: 'sign-in.component-dialog',
  templateUrl: 'sign-in.component-dialog.html',
})
export class SignInComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<SignInComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}