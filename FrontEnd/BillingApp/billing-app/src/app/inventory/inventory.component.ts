import { Component } from '@angular/core';
import { InventoryServiceService } from '../services/inventory-service/inventory-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  colomns:any=[];
  data:any=[];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private service: InventoryServiceService
  ){

  }
ngOnInit(){
  this.getAllProduct();
}
  getAllProduct(){
    this.service.getAllProduct({})
    .pipe(takeUntil(this.endsubs$))
    .subscribe(res=>{
      this.data = res;
      this.colomns = [
        {name:"Product ID",key:"productId"},
        {name:"Name",key:"name"},
        {name:"Type",key:"type"},
        {name:"Price",key:"price"},
        {name:"Size",key:"size"},
        {name:"Action",key:"action"},

      ]
    })
  }
  delete(id:any){
    this.service.deleteProduct({},id)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(res=>{
      console.log(res);
      this.getAllProduct();
    })
  }

}
