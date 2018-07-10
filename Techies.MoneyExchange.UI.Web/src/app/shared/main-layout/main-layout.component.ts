import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tme-main-layout',
  template: `
  <tme-header></tme-header>
  <router-outlet></router-outlet>
  <tme-footer></tme-footer>
  `
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
