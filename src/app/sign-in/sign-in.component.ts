import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from '@angular/fire'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatYearView } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { auth } from 'firebase';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Dialogboxcomponent } from '../DialogBox/Dialogbox.component';
import { formatDate } from '@angular/common';
import { CookieOptionsArgs } from 'angular2-cookie/services/cookie-options-args.model';
import { CookieOptions } from 'angular2-cookie/services/base-cookie-options';
import { ShoppingRESTService } from '../shopping-rest.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true; //set password hidden by default
  email = new FormControl('', [Validators.required, Validators.email]);
  CheckBoxUsername = false;
  MyDate : Date;

  constructor(private _router: Router,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private Auth: AuthServiceService,
    public SnackBar: MatSnackBar,
    private CookieService: CookieService,
    private ShoppingRest: ShoppingRESTService,
    private Router: Router) {
    this.FirstTimeCheck();
    this.MyDate = new Date();
    }



  ngOnInit() {

  }

  CreateUserBtn(): void {
    this.Router.navigate(['/Create']);
  }

  FirstTimeCheck(): void {
    //cookie
    if (this.CookieService.get("CookiesOk") == undefined) this.ShowCookiesPolicy();
    //username
    if (this.CookieService.get("Username") != undefined) {
      //set username in txt here
      this.email.setValue(this.CookieService.get("Username"));
      this.CheckBoxUsername = true;
    }
  }
  emailinvalidMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ShowCookiesPolicy(): void {
    var message = "Ved at logge ind acceptere du brugen af cookies"
    this.SnackBar.open(message, "Close", {
      panelClass: ['white-snackbar']
    });
  }


  SignInBtn(Username, Password): void {

    //make cookies remove snack
    this.CookieService.put("CookiesOk", "true", this.CookiesAddDays(365));
    this.SnackBar.dismiss();
    //checkbox remember username by cookies 
    if (this.CheckBoxUsername == true) this.CookieService.put("Username", Username, this.CookiesAddDays(14))


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


  mydate() {
    console.log("clicked")
    this.ShoppingRest.GetItems("Firebase").subscribe((Response) => console.log(Response), (error) => {
      console.log(error.code);
      this.openErrorDialog(error.code, error.message)
    })

  }

  CookiesAddDays( value : number) : CookieOptionsArgs {
    this.MyDate.setDate(this.MyDate.getDate() + value )
    let opts: CookieOptionsArgs = {
      expires: formatDate(this.MyDate, 'yyyy/MM/dd', 'en')
    };
    return opts;
  }

}
