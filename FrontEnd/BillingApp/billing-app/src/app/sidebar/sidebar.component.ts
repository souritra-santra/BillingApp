import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  visible = [true, true, true];

  constructor() { }

  toggleCollapse(id: number): void {
    for (let i = 0; i < this.visible.length; i++) {
      if (i==id) {
        this.visible[i] = !this.visible[i];
        $(`#submenu-icon${i}`).toggleClass('fa-caret-down fa-caret-right');
        
      }
      else{
        if(this.visible[i]==false){
        this.visible[i] =true;
        $(`#submenu-icon${i}`).toggleClass('fa-caret-right fa-caret-down');}
      }
    }
   
  }
  ngOnInit(): void {
    // Hide submenus
    // (<any>$('#body-row .collapse')).collapse('hide');   
    // $('[data-toggle=collapse]').click( function(){
    //   $('.collapse .sidebar-submenu').collapse('d-none');})
    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left');

    // Collapse click
    // $('[data-toggle=sidebar-colapse]').click(function () {
    //   SidebarCollapse();
    // });

    $('#sidebar-container').hover(function () {
      SidebarCollapse();
    });

    function SidebarCollapse() {
      $('.menu-collapsed').toggleClass('d-none');
      $('.sidebar-submenu').toggleClass('d-none');
      $('.submenu-icon').toggleClass('d-none');
      $('#sidebar-container').toggleClass('sidebar-collapsed sidebar-expanded');

      // Treating d-flex/d-none on separators with title
      var SeparatorTitle = $('.sidebar-separator-title');
      if (SeparatorTitle.hasClass('d-flex')) {
        SeparatorTitle.removeClass('d-flex');
      } else {
        SeparatorTitle.addClass('d-flex');
      }

      // Collapse/Expand icon
      $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }
  }

}
