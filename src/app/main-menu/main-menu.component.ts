import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthServiceService } from '../auth-service.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';


export interface PeriodicElement {
  name: string;
  Price: number;
  Department: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Yoghurt', Price: 12.95, Department: 'Mejeri'},
  {name: 'Mælk', Price: 7.95, Department: 'Mejeri'},
  {name: 'Fløde', Price: 6.95, Department: 'Mejeri'},
  {name: 'æg', Price: 19.95, Department: 'Mejeri'},
  {name: 'Kylling', Price: 45.0, Department: 'Kød'},
  {name: 'Steak', Price: 250.0, Department: 'Kød'},
  {name: 'Chips', Price: 14.95, Department: 'Slik'},
  {name: 'vingummi', Price: 19.95, Department: 'Slik'},
  {name: 'Sæbe', Price: 10.0, Department: 'Husholdning'},
  { name: 'skraldepose', Price: 8.95, Department: 'Husholdning'},
];

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  constructor(
    private CookieService: CookieService,
    private auth : AuthServiceService,
    private Router: Router,
  ) {
    this.ControllLogin();
   }

  ngOnInit() {
  }

  ControllLogin(){
    if(this.CookieService.get('UID') == undefined || !this.auth.GetUserLoggedIn()) {
      this.Router.navigate(['/signin'])
    }
  }

  displayedColumns: string[] = ['name', 'Price', 'Department'];
  dataSource = ELEMENT_DATA;

}
