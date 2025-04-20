import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { valHooks } from 'jquery';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { BillServiceService } from '../services/bill-service.service';
import { InventoryServiceService } from '../services/inventory-service/inventory-service.service';
import { MatDialog } from '@angular/material/dialog';
import { BillPreviewComponent } from '../bill-preview/bill-preview.component';
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
  options: any[] = [];
  prodOptions: any[] = [];
  selectedProduct: any;
  selectedCustomer: any;
  totalQty: number = 0;
  totalVal: number = 0;
  colomns = [
    { name: "Sl No.", key: "sln", footer:"Total" },
    { name: "Product ID", key: "productId" },
    { name: "Name", key: "name" },
    { name: "Quantity", key: "quantity", footer: "totalQty" },
    { name: "Rate", key: "rate" },
    { name: "Value", key: "value", footer: "totalVal" },
    { name: "Remove", key: "del" }
  ]
  data: any[] = [];
  
  constructor(
    public fb: FormBuilder,
    public service: BillServiceService,
    public invService: InventoryServiceService,
    public dialog : MatDialog
  ) {
    this.createForm()
  }
  createForm() {
    this.billForm = this.fb.group({
      name: ["", Validators.required],
      mobile: ["", Validators.required],
      address: ["", Validators.required],
      prodIdName: ["", Validators.required],
      quantity: ["",Validators.required]

    });
  }


  ngOnInit() {
    this.getCustomers();
    this.getProducts();
    this.filteredOptions = this.options;
    this.billForm.get("name")?.valueChanges.subscribe(response => {
      this.userSelected = false;
      if (response && response.length)
        this.filteredOptions = this._filter(response, "name");
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
      if (response && response.length)
        this.filteredOptions = this._filter(response, "address");
      else
        this.filteredOptions = [];
    });
    this.billForm.get("mobile")?.valueChanges.subscribe(response => {
      this.userSelected = false;
      if (response && response.length)
        this.filteredOptions = this._filter(response, "mobileNoString");
      else
        this.filteredOptions = [];
    });
    this.billForm.get("prodIdName")?.valueChanges.subscribe(response => {
      // this.userSelected = false;
      if (response && response.length)
        this.prodFilteredOptions = this._prodfilter(response);
      else
        this.prodFilteredOptions = [];
    });
  }
  getCustomers() {
    this.service.getAllCustomer({})
      .pipe(takeUntil(this.endsubs$))
      .subscribe((res: any) => {
        console.log(res);
        this.options = res;
      });
  }
  getProducts() {
    this.invService.getAllProduct({})
      .pipe(takeUntil(this.endsubs$))
      .subscribe((res: any) => {
        console.log(res);
        this.prodOptions = res;
      });
  }

  displayFn(user?: User): string {
    return user ? user.name : "";
  }

  private _filter(name: string, field: string): any {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option[field].toLowerCase().indexOf(filterValue) === 0)
    // return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _prodfilter(name: string): any {
    const filterValue = name.toLowerCase();
    return this.prodOptions.filter(option =>
      option.productId.toString().indexOf(filterValue) === 0 ||
      option.name.toLowerCase().indexOf(filterValue) != -1)
    // return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  selectName(item: any) {
    this.billForm.get("name")?.setValue(item.name);
    this.billForm.get("mobile")?.setValue(item.mobileNoString);
    this.billForm.get("address")?.setValue(item.address);
    this.userSelected = true;
    this.selectedCustomer = item;
  }
  selectProduct(item: any) {
    this.billForm.get("prodIdName")?.setValue(`${item.name}`);
    this.billForm.get("quantity")?.setValue(1);
    this.selectedProduct = item;
  }
  addCustomer() {
    const obj = {
      name: this.billForm.value.name,
      mobileNoString: this.billForm.value.mobile,
      address: this.billForm.value.address
    }
    this.service.addCustomer(obj)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(res => {
        console.log(res);
      })
  }

  addToBill() {
    let existingObj = this.data.find(obj=>obj.productId === this.selectedProduct.productId);
    
    if(existingObj){
      existingObj.quantity+=this.billForm.value.quantity;
      existingObj.value = parseFloat(this.selectedProduct.price) * existingObj.quantity;
    }else{
    this.data.push({
      productId: this.selectedProduct.productId,
      name: this.selectedProduct.name,
      quantity: this.billForm.value.quantity ? this.billForm.value.quantity : 1,
      rate: this.selectedProduct.price,
      value: parseFloat(this.selectedProduct.price) * (this.billForm.value.quantity ? this.billForm.value.quantity : 1)
    });
  }
  this.totalCalculation();
    this.billForm.get("prodIdName")?.setValue("");
    this.billForm.get("quantity")?.setValue("");
    this.selectedProduct = null;
  }
  totalCalculation(){
    this.totalQty = 0;
    this.totalVal = 0;
    this.data.map(obj=>{
      this.totalQty += obj.quantity;
      this.totalVal += obj.value;
    });
    
  }
  getDynamicValue(varName: string): any {
    if((this as any)[varName]==null )
      return false;
    else
    return (this as any)[varName];
  }
  remove(i:any){
    let obj = this.data[i];
    if(obj.quantity > 1){
      obj.quantity--;
      obj.value = parseFloat(obj.rate) * obj.quantity;
    }else{
      this.data = this.data.filter(option=>obj.productId !== option.productId);
    }
    this.totalCalculation();
  }
  preview(){
let previewDialog = this.dialog.open(BillPreviewComponent,{
  panelClass: 'preview-dialog',
  data:{
    formValue : this.billForm.value,
    customerDet: this.selectedCustomer,
    colomns: this.colomns,
    billData : this.data,
    totalQty: this.totalQty,
    totalVal : this.totalVal
  }
})
  }
  save() {
    console.log(this.billForm);
    const obj = {
      name: this.billForm.value.name,
      price: this.billForm.value.price,
      type: this.billForm.value.catagory,
      size: this.billForm.value.size
    };
    this.service.getAllBill(obj)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(res => {

      })

  }

  cancel() {

  }

}
