import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthServiceService } from '../auth-service.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { ShoppingRESTService } from '../shopping-rest.service';
import { MatDialog } from '@angular/material';
import { Dialogboxcomponent } from '../DialogBox/Dialogbox.component';
import { DataSource } from '@angular/cdk/table';



export interface Items {
  Id? : number;
  Name: string;
  Price: number;
  Category: string;
  UID? : string;
}


const ELEMENT_DATA: Items[] = [
  { Name: 'Yoghurt', Price: 12.95, Category: 'Mejeri' },
  { Name: 'Mælk', Price: 7.95, Category: 'Mejeri' },
  { Name: 'Fløde', Price: 6.95, Category: 'Mejeri' },
  { Name: 'æg', Price: 19.95, Category: 'Mejeri' },
  { Name: 'Kylling', Price: 45.0, Category: 'Kød' },
  { Name: 'Steak', Price: 250.0, Category: 'Kød' },
  { Name: 'Chips', Price: 14.95, Category: 'Slik' },
  { Name: 'vingummi', Price: 19.95, Category: 'Slik' },
  { Name: 'Sæbe', Price: 10.0, Category: 'Husholdning' },
  { Name: 'skraldepose', Price: 8.95, Category: 'Husholdning' },
];

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  LoadingList: Boolean = true;
  dataSource : any;

  displayedColumns: string[] = ['name', 'Price', 'Category'];
  //dataSource = ELEMENT_DATA;

  constructor(
    private CookieService: CookieService,
    private auth: AuthServiceService,
    private Router: Router,
    private ShoppingRest: ShoppingRESTService,
    public dialog: MatDialog,
  ) {
    this.ControllLogin();
    this.GetItems();
  }

  ngOnInit() {
  }

  ControllLogin() {
    if (this.CookieService.get('UID') == undefined || !this.auth.GetUserLoggedIn()) {
      this.Router.navigate(['/signin'])
    }
  }



  GetItems() {
    let uid = this.CookieService.get('UID');
    this.ShoppingRest.GetItems(uid).subscribe(
      (Response) => {
        this.LoadingList = false
        this.dataSource = Response;
        //todo smid ind på liste her brug response
      },
      (error) => {
        this.LoadingList = false
        this.openErrorDialog(error.code, error.message)
      })
  }


  openErrorDialog(errorcode, errormessage): void {
    const dialogRef = this.dialog.open(Dialogboxcomponent, {
      width: '350px',
      data: { errorCode: errorcode, errorMessage: errormessage }
    });

  }
}
