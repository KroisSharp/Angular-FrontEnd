import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { auth } from 'firebase';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Dialogboxcomponent } from '../DialogBox/Dialogbox.component';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {



  constructor(private _router: Router,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private Auth: AuthServiceService,
    public SnackBar: MatSnackBar,
    private CookieService: CookieService,
    private Router : Router) {
      this.FirstTimeCheck();
     }

    hide = true; //set password hidden by default
    email = new FormControl('', [Validators.required, Validators.email]);
    CheckBoxUsername = false; 

  ngOnInit() {
  
  }

  CreateUserBtn() : void{
    this.Router.navigate(['/Create']);
  }

FirstTimeCheck() : void{
  //cookie
  if(this.CookieService.get("CookiesOk") == undefined) this.ShowCookiesPolicy();
  //username
  if(this.CookieService.get("Username") != undefined){
    //set username in txt here
    this.email.setValue(this.CookieService.get("Username"));
    this.CheckBoxUsername = true;
  }
}
  emailinvalidMessage()  {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ShowCookiesPolicy() : void{
    var message = "Ved at logge ind acceptere du brugen af cookies"
    this.SnackBar.open(message, "Close", {
      panelClass: ['white-snackbar']
    });
  }


  SignInBtn(Username, Password) : void {
    //make cookies remove snack
    this.CookieService.put("CookiesOk", "true");
    this.SnackBar.dismiss();
    //checkbox remember username by cookies 
    if(this.CheckBoxUsername == true) this.CookieService.put("Username", Username)


    // do login
    this.Auth.DoLogin(Username, Password).catch(err => {
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
