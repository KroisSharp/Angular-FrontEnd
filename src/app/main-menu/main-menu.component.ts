import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthServiceService } from '../auth-service.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { ShoppingRESTService } from '../shopping-rest.service';
import { MatDialog } from '@angular/material';
import { Dialogboxcomponent } from '../DialogBox/Dialogbox.component';



export interface PeriodicElement {
  name: string;
  Price: number;
  Category: string;
}


// public virtual int Id { get; set; }
// public virtual string Name { get; set; }
// public virtual double Price { get; set; }
// public virtual string Category { get; set; }
// public virtual string UID { get; set; }


const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Yoghurt', Price: 12.95, Category: 'Mejeri' },
  { name: 'Mælk', Price: 7.95, Category: 'Mejeri' },
  { name: 'Fløde', Price: 6.95, Category: 'Mejeri' },
  { name: 'æg', Price: 19.95, Category: 'Mejeri' },
  { name: 'Kylling', Price: 45.0, Category: 'Kød' },
  { name: 'Steak', Price: 250.0, Category: 'Kød' },
  { name: 'Chips', Price: 14.95, Category: 'Slik' },
  { name: 'vingummi', Price: 19.95, Category: 'Slik' },
  { name: 'Sæbe', Price: 10.0, Category: 'Husholdning' },
  { name: 'skraldepose', Price: 8.95, Category: 'Husholdning' },
];

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  LoadingList: Boolean = true;

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

  displayedColumns: string[] = ['name', 'Price', 'Category'];
  dataSource = ELEMENT_DATA;

  GetItems() {
    let uid = this.CookieService.get('UID');
    this.ShoppingRest.GetItems(uid).subscribe(
      (Response) => {
        this.LoadingList = false
        //todo smid ind på liste her
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
