import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { SignInComponent } from './sign-in/sign-in.component';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public afAuth: AngularFireAuth,
    private Router : Router) { }

  DoLogin(Username, Password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(Username, Password)
        .then(res => {
          resolve(res);
          this.Router.navigate(['/mainmenu'])
        }, err => {
          reject(err)
          console.log(err)
        })
    })
  }


}
