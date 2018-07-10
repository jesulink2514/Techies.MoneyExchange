import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tme-header',
  template: `
  <tme-header></tme-header>
  <router-outlet></router-outlet>
  <tme-footer></tme-footer>
  `,
  styles: [
    `
  .bg-white {
      background-color: white;
  }
  .active{
      font-weight: bold;
  }`]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
