import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { configUrl } from 'src/environments/cofig.url';

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {

  constructor(public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*'   
    })
   };

   url_getAllProduct = environment.apihost + configUrl.bill.getAllBill;
   url_getAddCustomer = environment.apihost + configUrl.bill.addCustomer;
   url_getAllCustomer= environment.apihost + configUrl.bill.getAllCustomer;
   url_addDraftedBill= environment.apihost + configUrl.bill.addDraftBill;
   url_addBillComplete= environment.apihost + configUrl.bill.addBillComplete;


   addCustomer(obj:any){
    return this.http.post(this.url_getAddCustomer,obj);
   }
   getAllCustomer(obj:any){
    return this.http.post(this.url_getAllCustomer,obj);
   }
   getAllBill(obj:any){
    return this.http.post(this.url_getAllProduct,obj);
   }
   addDraftedBill(obj:any){
    return this.http.post(this.url_addDraftedBill,obj);
   }
   addBillComplete(obj:any){
    return this.http.post(this.url_addBillComplete,obj);
   }
}
 