import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { ReturnBillComponent } from './return-bill/return-bill.component';
import { EditBillComponent } from './edit-bill/edit-bill.component';
import { ViewAllBillsComponent } from './view-all-bills/view-all-bills.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CustomerComponent } from './customer/customer.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bill/new', component: NewBillComponent },
  { path: 'bill/return', component: ReturnBillComponent },
  { path: 'bill/edit', component: EditBillComponent },
  { path: 'bill/view', component: ViewAllBillsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/addProduct', component: AddProductComponent },
  { path: 'customer', component: CustomerComponent  },
  { path: 'customer/new', component: NewCustomerComponent  }

    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
