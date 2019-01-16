import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { SignInComponent } from './sign-in/sign-in.component';
import {Router} from '@angular/router'
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private UserLoggedIn: Boolean = false;

  constructor(public afAuth: AngularFireAuth,
    private Router : Router) { }


    GetUserLoggedIn(){
      return this.UserLoggedIn;
    }
  
    SetUserLoggedIn(value: Boolean){
      this.UserLoggedIn = value;
    }

  DoLogin(Username, Password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(Username, Password)
        .then(res => {
          resolve(res);
          this.SetUserLoggedIn(true);
          this.Router.navigate(['/mainmenu'])
          //Routing Protection https://www.youtube.com/watch?v=k3_6a7anWBQ
          //cookie session
        }, err => {
          reject(err)
          console.log(err)
        })
    })
  }

 CreateUser(Username, Password){
   return new Promise<any>((resolve, reject) =>{
     firebase.auth().createUserWithEmailAndPassword(Username,Password)
     .then(res =>{
       resolve(res);
       this.SetUserLoggedIn(true);
       this.Router.navigate(['/mainmenu'])
     })
     err =>{
       reject(err)
       console.log(err)
     }
   })
 }



}
