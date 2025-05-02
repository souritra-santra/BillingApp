import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements AfterViewInit {
  @Input() barcodeValue: string = '';
  @ViewChild('barcode') barcodeElement!: ElementRef;

  ngAfterViewInit() {
    JsBarcode(this.barcodeElement.nativeElement, this.barcodeValue, {
      format: 'CODE128',
      lineColor: '#000',
      width: 3,
      height: 50,
      displayValue: false
    });
  }

}
