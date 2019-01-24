import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Button } from 'protractor';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Dialogboxcomponent } from './DialogBox/Dialogbox.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private Auth: AuthServiceService,
     public dialog: MatDialog,
     private Router: Router,
     ){
    this.Router.navigate(['signin'])
  }



  GetUserLoggedIn() : Boolean{
    return this.Auth.GetUserLoggedIn();
  }


  LogOut() : void{
    this.Auth.SignOut().catch(err =>{
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




//https://www.youtube.com/watch?v=mfONkAj4x94&t=69s