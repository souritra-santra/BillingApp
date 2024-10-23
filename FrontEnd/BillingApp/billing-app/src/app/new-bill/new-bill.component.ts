import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { valHooks } from 'jquery';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { BillServiceService } from '../services/bill-service.service';
import { InventoryServiceService } from '../services/inventory-service/inventory-service.service';
export interface User {
  name: string;
}
@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit {

  billForm!: FormGroup;
  endsubs$: Subject<any> = new Subject();
  myControl = new FormControl();
  filteredOptions!: any;
  prodFilteredOptions!: any;
  userSelected!: boolean;
 options:any[] = [];
 prodOptions:any[]=[];
  selectedProduct: any;
  selectedCustomer: any;
  colomns = [
    {name:"Sl No.",key:"sln"},
    {name:"Product ID",key:"productId"},
    {name:"Name",key:"name"},
    {name:"Quantity",key:"quantity"},
    {name:"Rate",key:"rate"},
    {name:"Value",key:"value"},
  ]
  data: any = [];
  constructor(
    public fb: FormBuilder,
    public service: BillServiceService,
    public invService: InventoryServiceService
  ){
   this.createForm()
  }
  createForm(){
    this.billForm = this.fb.group({
      name:["",Validators.required],
      mobile:["",Validators.required],
      address:["",Validators.required],
      prodIdName:["",Validators.required],
      quantity:[]

    });
  }
 
  
  ngOnInit() {
    this.getCustomers();
    this.getProducts();
    this.filteredOptions = this.options;
    this.billForm.get("name")?.valueChanges.subscribe(response => {
      this.userSelected = false;
      if(response && response.length)
        this.filteredOptions = this._filter(response,"name");
      else
        this.filteredOptions = [];
    }
    
   
      // .pipe(
      //   startWith<string | any>(''),
      //   map(value => typeof value === 'string' ? value : value.name),
      //   map(name => name ? this.options.slice() : this.options.slice())
      );
      this.billForm.get("address")?.valueChanges.subscribe(response => {
        this.userSelected = false;
        if(response && response.length)
          this.filteredOptions = this._filter(response,"address");
        else
          this.filteredOptions = [];
      });
      this.billForm.get("mobile")?.valueChanges.subscribe(response => {
        this.userSelected = false;
        if(response && response.length)
          this.filteredOptions = this._filter(response,"mobileNoString");
        else
          this.filteredOptions = [];
      });
      console.log(this.filteredOptions);
      this.billForm.get("prodIdName")?.valueChanges.subscribe(response => {
        // this.userSelected = false;
        if(response && response.length)
          this.prodFilteredOptions = this._prodfilter(response);
        else
          this.prodFilteredOptions = [];
        console.log(this.prodFilteredOptions);
      });
  }
  getCustomers(){
    this.service.getAllCustomer({})
    .pipe(takeUntil(this.endsubs$))
    .subscribe((res:any)=>{
      console.log(res);
      this.options = res;
    });
  }
  getProducts(){
    this.invService.getAllProduct({})
    .pipe(takeUntil(this.endsubs$))
    .subscribe((res:any)=>{
      console.log(res);
      this.prodOptions = res;
    });
  }

  displayFn(user?: User): string {
    return user ? user.name : "";
  }

  private _filter(name: string,field:string): any {
    const filterValue = name.toLowerCase();
return this.options.filter(option => option[field].toLowerCase().indexOf(filterValue) === 0)
    // return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _prodfilter(name: string): any {
    const filterValue = name.toLowerCase();
return this.prodOptions.filter(option => option.productId.toString().indexOf(filterValue) === 0 || option.name.toLowerCase().indexOf(filterValue) === 0 )
    // return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  selectName(item:any){
    this.billForm.get("name")?.setValue(item.name);
    this.billForm.get("mobile")?.setValue(item.mobileNoString);
    this.billForm.get("address")?.setValue(item.address);
    this.userSelected = true;
    this.selectedCustomer = item;
  }
  selectProduct(item:any){
    this.billForm.get("prodIdName")?.setValue(`${item.name}`);
    this.selectedProduct = item;
  }
  addCustomer(){
    const obj = {
      name: this.billForm.value.name,
      mobileNoString: this.billForm.value.mobile,
      address: this.billForm.value.address
    }
    this.service.addCustomer(obj)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(res=>{
      console.log(res);
    })
  }

  addToBill(){
    this.data.push({
      productId:this.selectedProduct.productId,
      name:this.selectedProduct.name,
      quantity: this.billForm.value.quantity?this.billForm.value.quantity:1,
      rate:this.selectedProduct.price,
      value: parseFloat(this.selectedProduct.price)*(this.billForm.value.quantity?this.billForm.value.quantity:1)
    });
    this.billForm.get("prodIdName")?.setValue("");
    this.billForm.get("quantity")?.setValue(1);
  }

  save(){
    console.log(this.billForm);
    const obj = {
      name: this.billForm.value.name,
      price: this.billForm.value.price,
      type: this.billForm.value.catagory,
      size: this.billForm.value.size
    };
    this.service.getAllBill(obj)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(res=>{

    })

  }
  cancel(){
    
  }

}
