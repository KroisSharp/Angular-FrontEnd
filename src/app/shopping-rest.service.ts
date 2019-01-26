import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingRESTService {

  private BaseURL : string = 'http://localhost:52818/api'


  constructor(
    private HttpClient : HttpClient,
  ) { }

  GetItems(UID : String) : Observable<object> {
   return this.HttpClient.get( this.BaseURL + '/items/' + UID)
  }

}
