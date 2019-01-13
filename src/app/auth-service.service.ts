import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { resolve, reject } from 'q';
import { SignInComponent } from './sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public afAuth: AngularFireAuth) { }

  DoLogin(Username, Password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(Username, Password)
        .then(res => {
          console.log(res)
          resolve(res);
        }, err => {
          reject(err)
          console.log(err)
        })
    })
  }


}
