import { Component } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { valHooks } from 'jquery';
import { InventoryServiceService } from '../services/inventory-service/inventory-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productForm!: FormGroup;
  endsubs$: Subject<any> = new Subject();
  constructor(
    public fb: FormBuilder,
    public service: InventoryServiceService
  ){
   this.createForm()
  }
  createForm(){
    this.productForm = this.fb.group({
      name:["",Validators.required],
      price:["",Validators.required],
      catagory:["",Validators.required],
      size:["",Validators.required]

    });
  }
  save(){
    console.log(this.productForm);
    const obj = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      type: this.productForm.value.catagory,
      size: this.productForm.value.size
    };
    this.service.addProduct(obj)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(res=>{

    })

  }
  cancel(){
    
  }
}
