import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


export interface Category {
  Department: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  myControl = new FormControl();
  options: Category[] = [
    {Department: 'mejeri'},
    {Department: 'kød'},
    {Department: 'slik'}
  ];
  filteredOptions: Observable<Category[]>;


  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith<string | Category>(''),
      map(value => typeof value === 'string' ? value : value.Department),
      map(Department => Department ? this._filter(Department) : this.options.slice())
    );
  }


  displayFn(Category?: Category): string | undefined {
    return Category ? Category.Department : undefined;
  }

  private _filter(Department: string): Category[] {
    const filterValue = Department.toLowerCase();

    return this.options.filter(option => option.Department.toLowerCase().indexOf(filterValue) === 0);
  }


  PostItem(name : string, Category : string, price : string){
    console.log("name: " + name + " category: " + Category + " Price: " + price);
    //txt box tom
    //snack med ok
    //dialog ved fejl
  }

}
