import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingRESTService {

  private reqHeader = new HttpHeaders({"Content-Type": "application/json"});


  constructor(
    private HttpClient : HttpClient,
  ) { }

  GetItems(UID : String) : Observable<object> {
   return this.HttpClient.get('http://localhost:52818/api/items/' + UID)
  }

}
