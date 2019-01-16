import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit() {
  }


  displayedColumns: string[] = ['name', 'Price', 'Department'];
  dataSource = ELEMENT_DATA;

}
