import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { AssetsLink, CommonService, FirebaseService, ROUTE, UserService } from 'tt-library-angular-porfolio';
import { invisibleEyeEnter, invisibleEyeLeave } from '../../animations';

@Component({
  selector: 'tt-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    AssetsLink,
    TranslateModule,
    CommonModule,
  ],
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
    private userService: UserService,
  ) { }

  ngOnInit() {
    // this.initLoginForm();
    // this.initSignupForm();
    // if (!this.firebaseService.auth) this.firebaseService.initAuth();
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
  loginWithGoogle() {
    if (!this.firebaseService.firebaseApp || !this.firebaseService.auth) {
      console.error('firebase aut app is invalid');
      this.commonService.showError();
      return;
    }
    const googleProvider = new GoogleAuthProvider();
    if (this.firebaseService.auth) {
      signInWithPopup(this.firebaseService.auth, googleProvider)
        .then((resp: UserCredential) => {
          if (resp) this.userService.user = resp;
          const _url = `${ROUTE.CMS}/${ROUTE.CMS_MAIN}`
          this.commonService.gotoURL(_url);
        })
        .catch((error: any) => {
          console.error('login error', error);
          this.commonService.showError();
        });
      }

    // setPersistence(this.firebaseService.auth, {type: 'LOCAL'})
    //   .then(resp => {
    //     console.log(resp);
    //     const googleProvider = new GoogleAuthProvider();
    //     if (this.firebaseService.auth) {
    //       signInWithPopup(this.firebaseService.auth, googleProvider)
    //         .then((resp: UserCredential) => {
    //           if (resp) this.userService.user = resp;
    //           const _url = `${ROUTE.MANAGEMENT}/${ROUTE.INSIDE_MANAGEMENT}`
    //           this.commonService.gotoURL(_url);
    //         })
    //         .catch((error: any) => {
    //           console.error('login error', error);
    //           this.commonService.showError();
    //         });
    //       }
    //   })
    //   .catch((error: any) => {
    //     console.error('login error', error);
    //     this.commonService.showError();
    //   });
  }

  loginWithFacebook() {}
  //end region
}
