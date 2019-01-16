import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ErrorStateMatcher } from '@angular/material/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthServiceService } from '../auth-service.service';
import { Dialogboxcomponent } from '../DialogBox/Dialogbox.component';

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
  constructor(
    private CookieService: CookieService,
    private Auth: AuthServiceService,
    public dialog: MatDialog,) {}


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

  CreateUserBtn(Username,Password){
    this.CookieService.put("CookiesOk", "true");

    this.Auth.CreateUser(Username,Password).catch(err =>{
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



}



