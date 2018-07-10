import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'tme-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public message: string;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.form = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {

    if (this.form.invalid) {
      return;
    }

    const credentials = this.form.value;

    this.message = '';
    this.form.disable();

    this.loginService.loginWithPassword(credentials.username, credentials.password)
      .subscribe(r => {
        localStorage.setItem('token', r);
        this.form.enable();
      }, e => {
        this.message = 'Invalid username or password.';
        this.form.enable();
      });
  }

}
