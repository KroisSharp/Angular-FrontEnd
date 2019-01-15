import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Button } from 'protractor';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private Auth: AuthServiceService){}

  GetUserLoggedIn(){
    return this.Auth.GetUserLoggedIn();
  }

}

//https://www.youtube.com/watch?v=mfONkAj4x94&t=69s