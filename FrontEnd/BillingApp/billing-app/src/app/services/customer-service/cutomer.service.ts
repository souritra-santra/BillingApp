import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrl } from 'src/environments/cofig.url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CutomerService {
  constructor(public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*'   
    })
   };

   url_getAddCustomer = environment.apihost + configUrl.customer.addCustomer;
   url_getAllCustomer= environment.apihost + configUrl.customer.getAllCustomer;
   

   addCustomer(obj:any){
    return this.http.post(this.url_getAddCustomer,obj);
   }
   getAllCustomer(obj:any){
    return this.http.post(this.url_getAllCustomer,obj);
   }
   
}
