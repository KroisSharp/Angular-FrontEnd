import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { SignInComponent } from './sign-in/sign-in.component';
import { Router } from '@angular/router'
import { AppComponent } from './app.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieOptionsArgs } from 'angular2-cookie/services/cookie-options-args.model';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private UserLoggedIn: Boolean = false;
  MyDate: Date;

  constructor(
    public afAuth: AngularFireAuth,
    private Router: Router,
    private Coookie: CookieService) {
    this.MyDate = new Date();
  }


  GetUserLoggedIn(): Boolean {
    return this.UserLoggedIn;
  }

  SetUserLoggedIn(value: Boolean): void {
    this.UserLoggedIn = value;
  }

  DoLogin(Username, Password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(Username, Password)
        .then(res => {
          resolve(res);
          this.SetUserLoggedIn(true);
          this.Coookie.put('UID', firebase.auth().currentUser.uid, this.CookiesAddDays(14))
          this.Router.navigate(['/mainmenu'])
          //Routing Protection https://www.youtube.com/watch?v=k3_6a7anWBQ
          //cookie session
        }, err => {
          reject(err)
          console.log(err)
        })
    })
  }

  CreateUser(Username, Password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(Username, Password)
        .then(res => {
          resolve(res);
          this.SetUserLoggedIn(true);
          this.Coookie.put('UID', firebase.auth().currentUser.uid, this.CookiesAddDays(14))
          this.Router.navigate(['/mainmenu'])
        })
      err => {
        reject(err)
        console.log(err)
      }
    })
  }

  SignOut(): Promise<any> {
    if (this.Coookie.get("Username") != undefined) this.Coookie.remove("Username");
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signOut()
        .then(res => {
          resolve(res);
          this.Coookie.remove("UID")
          this.Router.navigate(['signin'])
        })
      err => {
        reject(err)
        console.log(err)
      }
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
