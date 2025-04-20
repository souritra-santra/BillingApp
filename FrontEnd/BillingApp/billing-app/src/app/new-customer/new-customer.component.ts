import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryServiceService } from '../services/inventory-service/inventory-service.service';
import { BillServiceService } from '../services/bill-service.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  billForm!: FormGroup;
  endsubs$: Subject<any> = new Subject();
  constructor(
    public fb: FormBuilder,
    public service: BillServiceService,
    public invService: InventoryServiceService
  ) {
    this.createForm()
  }
  createForm() {
    this.billForm = this.fb.group({
      name: ["", Validators.required],
      mobile: ["", Validators.required],
      address: ["", Validators.required]

    });
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


}
