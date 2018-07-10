import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './authentication/token.interceptor';
import { AuthGuard } from './authentication/auth.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    TokenInterceptor,
    AuthGuard
  ]
})
export class CoreModule { }
