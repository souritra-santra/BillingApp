import { Component, Inject, OnInit } from '@angular/core';
import { BillServiceService } from '../services/bill-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.css']
})
export class BillPreviewComponent implements OnInit{
  billForm!: FormGroup;
  endsubs$: Subject<any> = new Subject();
  customer: any;
  bill: any;
  billingtime: any;
  totalQty: number = 0;
  totalVal: number = 0;
  colomns = [
    { name: "Sl No.", key: "sln", footer:"Total" },
    { name: "Name", key: "name" },
    { name: "Quantity", key: "quantity", footer: "totalQty" },
    { name: "Rate", key: "price" },
    { name: "Value", key: "value", footer: "totalVal" }
    ];
  datasource: any = [];
  paymentMode: string = "";

  constructor(
    public fb: FormBuilder,
    public service: BillServiceService,
    public datePipe: DatePipe,
    public dialogRef : MatDialogRef<BillPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
this.createForm();
  }
  createForm() {
    this.billForm = this.fb.group({
      disTotal: ["", Validators.required],
      discount: ["", Validators.required],
      paidAmt: ["", Validators.required],
      dueAmt: ["", Validators.required]
    });
  }
  ngOnInit() {
    console.log(this.data);
    this.customer = this.data.result?.customer;
    this.bill = this.data.result?.bill;
    this.billingtime = this.bill.billingDtTime;
    this.billingtime = this.datePipe.transform(this.billingtime,"dd/mm/yyyy HH:mm");
    this.totalQty = this.bill.totalQty;
    this.totalVal = this.bill.total;
    this.datasource = this.bill.products;
    this.billForm.get("disTotal")?.setValue(this.totalVal);
    this.billForm.get("discount")?.setValue("0.00");
    this.billForm.get("paidAmt")?.setValue(this.totalVal);
    this.billForm.get("dueAmt")?.setValue(0);
  }
  payment(mode:string){
    this.paymentMode = mode;
    console.log(this.billForm);
    
  }
  disChange(str:string){
    let disTotal = this.billForm.value.disTotal;
    let discount = this.billForm.value.discount;
    if(str == "T"){

      discount = ((this.totalVal-disTotal)/this.totalVal)*100;
      this.billForm.get("discount")?.setValue(discount.toFixed(2));
    }
    else{
      discount = discount.toFixed(2);
      this.billForm.get("discount")?.setValue(discount);
      disTotal = this.totalVal-(this.totalVal*discount/100);
      this.billForm.get("disTotal")?.setValue(disTotal.toFixed(0));
    }
    this.dueChange('P');
  }
  dueChange(str:string){
    let disTotal = this.billForm.value.disTotal;
    let paidAmt = this.billForm.value.paidAmt;
    let dueAmt = this.billForm.value.dueAmt;
    if(str == "D"){
      paidAmt = (disTotal-dueAmt);
      this.billForm.get("paidAmt")?.setValue(paidAmt);
    }
    else{
      dueAmt = (disTotal-paidAmt);
      this.billForm.get("dueAmt")?.setValue(dueAmt);
    }
    if(dueAmt<0 || paidAmt<0){
      this.billForm.get("paidAmt")?.setValue(disTotal);
      this.billForm.get("dueAmt")?.setValue(0);
    }

  }
  getDynamicValue(varName: string): any {
    if((this as any)[varName]==null )
      return false;
    else
    return (this as any)[varName];
  }
  save(str:string){

    let obj = this.bill;
    obj.disTotal = this.billForm.value.disTotal;
    obj.discount = this.billForm.value.discount;
    obj.dueAmt = this.billForm.value.dueAmt;
    obj.paidAmt = this.billForm.value.paidAmt;
    obj.paymentM = this.paymentMode;
    this.service
    .addBillComplete(obj)
    .pipe(takeUntil(this.endsubs$))
      .subscribe((res: any) => {
        if(str=='P'){
          this.print();
        }
        this.close();
      });

  }
  print(){
    window.print();
  }
  close(str:string = 'C'){
    if(str!='C'){
      
    }
    this.dialogRef.close();
  }

}
