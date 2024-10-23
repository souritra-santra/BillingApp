import { Component } from '@angular/core';
import { CutomerService } from '../services/customer-service/cutomer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  colomns:any=[];
  data:any=[];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private service: CutomerService
  ){

  }
ngOnInit(){
  this.getAllProduct();
}
  getAllProduct(){
    this.service.getAllCustomer({})
    .pipe(takeUntil(this.endsubs$))
    .subscribe(res=>{

      console.log(res);
      
      this.data = res;
      this.colomns = [
        {name:"Customer ID",key:"customerId"},
        {name:"Name",key:"name"},
        {name:"Mobile No.",key:"mobileNoString"},
        {name:"Address",key:"address"},
        {name:"Action",key:"action"},

      ]
    })
  }
  delete(id:any){

  }
}
