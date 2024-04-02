import { Component, OnInit } from '@angular/core';
import { ValidationErrors, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { invisibleEyeEnter, invisibleEyeLeave } from '../../../../animations';

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  animations: [invisibleEyeEnter, invisibleEyeLeave]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  signupForm!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  isSignUp: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initLoginForm();
    this.initSignupForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmPasswordValidator]],
    });
  }

  confirmPasswordValidator = (control: AbstractControl): ValidationErrors => {
    const password = this.loginForm.value['password'];

    if (!control.value) return {required: true};

    if (control.value !== password) return {notMatchPassword: true};

    return {};
  }

  onClickGoToSignUp() {
    this.isSignUp = true;
  }

  onClickBackToLogin() {
    this.isSignUp = false;
  }
}
