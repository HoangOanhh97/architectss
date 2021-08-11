import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface IUser {
  email: String,
  password: String
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: IUser = {
    email: '',
    password: '',
  };
  public loginForm: FormGroup;
  public hide = true;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required)
    })

    this.loginForm.valueChanges.subscribe(response => {
      Object.keys(response).forEach(key => {
        this.getErrorMessage(key)
      })
    })
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user)
    // this.router.navigate(['agency']);
  }

  getErrorMessage(name) {
    if (this.loginForm.controls[name].hasError('required') || this.loginForm.controls[name].dirty) {
      return 'You must enter a value';
    }

    return this.loginForm.controls[name].hasError('email') ? 'Not a valid email' : '';
  }

}
