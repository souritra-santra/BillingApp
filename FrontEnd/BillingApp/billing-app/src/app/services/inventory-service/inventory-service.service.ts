import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { configUrl } from 'src/environments/cofig.url';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  constructor(public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*'   
    })
   };

   url_getAllProduct = environment.apihost + configUrl.inventory.getallproduct;
   url_addProduct = environment.apihost + configUrl.inventory.addProduct;
   url_deleteProduct = environment.apihost + configUrl.inventory.deleteProduct;

   
   getAllProduct(obj:any){
    return this.http.post(this.url_getAllProduct,obj);
   }
   addProduct(obj:any){
    return this.http.post(this.url_addProduct,obj);
   }
   deleteProduct(obj:any,id:any){
    return this.http.delete(this.url_deleteProduct+id,obj);
   }
}
