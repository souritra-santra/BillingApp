import { Component, Inject, OnInit } from '@angular/core';
import { BillServiceService } from '../services/bill-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-preview',
  templateUrl: './bill-preview.component.html',
  styleUrls: ['./bill-preview.component.css']
})
export class BillPreviewComponent implements OnInit{

  constructor(
    public service: BillServiceService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {

  }

  ngOnInit() {
    console.log(this.data);
    
  }
}
