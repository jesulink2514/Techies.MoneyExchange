import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeadlineComponent } from './headline/headline.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MainLayoutComponent, HeaderComponent, FooterComponent, HeadlineComponent]
})
export class SharedModule { }
