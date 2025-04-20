import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
currenttime:any="";

constructor(
  private datePipe : DatePipe
){
setInterval(() => {
  let curdate = new Date();
  this.currenttime = this.datePipe.transform(curdate,"dd-MMM-yyyy HH:mm:ss");
}, 1000);

}

ngOnInit() {

}
}
