import { Component, OnInit } from '@angular/core';
import { ValidationErrors, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { invisibleEyeEnter, invisibleEyeLeave } from '../../../../animations';
import { CommonService, FirebaseService } from 'tt-library-angular-porfolio';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    // this.initLoginForm();
    // this.initSignupForm();
    this.firebaseService.initAuth();
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

  //region v2
  async loginWithGoogle() {
    if (!this.firebaseService.firebaseApp || !this.firebaseService.auth) {
      console.error('firebase aut app is invalid');
      this.commonService.showError();
      return;
    }

    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(this.firebaseService.auth, googleProvider)
    .then((resp: any) => {
      console.log(resp)
    })
    .catch((error: any) => {
      console.error('login error', error);
    })
  }

  loginWithFacebook() {}
  //end region
}
