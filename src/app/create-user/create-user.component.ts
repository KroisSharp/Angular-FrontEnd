import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ErrorStateMatcher } from '@angular/material/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthServiceService } from '../auth-service.service';
import { Dialogboxcomponent } from '../DialogBox/Dialogbox.component';
import { Options } from 'selenium-webdriver/firefox';
import { BaseCookieOptions, CookieOptions } from 'angular2-cookie/services/base-cookie-options';
import { CookieOptionsArgs } from 'angular2-cookie/services/cookie-options-args.model';
import {formatDate} from '@angular/common';

export interface DialogData {
  errorCode: string;
  errorMessage: string;


}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(7)]);
  PasswordCheck = false;
  MyDate : Date;


  constructor(
    private CookieService: CookieService,
    private Auth: AuthServiceService,
    public dialog: MatDialog,) { 
      this.MyDate = new Date();
    }


  ngOnInit() {
  }

  emailinvalidMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  PasswordinvalidMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minLength') ? '' :
        'password must be at least 7 characters';
  }

  CreateUserBtn(Username, Password): void {



    this.CookieService.put("CookiesOk", "true", this.CookiesAddDays(365));

    this.Auth.CreateUser(Username, Password).catch(err => {
      console.log(err.code)
      this.openErrorDialog(err.code, err.message)

    })
  }


  openErrorDialog(errorcode, errormessage): void {
    const dialogRef = this.dialog.open(Dialogboxcomponent, {
      width: '350px',
      data: { errorCode: errorcode, errorMessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }

  CookiesAddDays( value : number) : CookieOptionsArgs {
    this.MyDate.setDate(this.MyDate.getDate() + value )
    let opts: CookieOptionsArgs = {
      expires: formatDate(this.MyDate, 'yyyy/MM/dd', 'en')
    };
    return opts;
  }

}



