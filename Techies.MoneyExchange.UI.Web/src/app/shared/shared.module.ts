import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { DecimalInputDirective } from './directives/decimal-input.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DecimalInputDirective
  ],
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    DecimalInputDirective
  ]
})
export class SharedModule { }
