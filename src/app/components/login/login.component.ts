import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import {
  AssetsLink,
  CommonService,
  FirebaseService,
  FIRESTORE_COLLECTION,
  FIRESTORE_PERMISSIOON,
  IFirestoreUser,
  ROUTE,
  UserService,
  WinfitOnlineService,
} from 'tt-library-angular-porfolio';
import { invisibleEyeEnter, invisibleEyeLeave } from '../../animations';
import { v4 as uuid } from 'uuid';

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
    private winfitOnline: WinfitOnlineService,
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
          if (resp) {
            this.userService.user = resp;

            this.firebaseService.checkExistStore<IFirestoreUser>('email', this.userService.user.email).subscribe({
              next: resp => {
                if (resp.empty) {
                  const _uuid: string = uuid();
                  const _user: IFirestoreUser = {
                    uuid: _uuid,
                    email: this.userService.user.email,
                    phone_number: this.userService.user.phoneNumber,
                    permission: FIRESTORE_PERMISSIOON.USER,
                    full_name: this.userService.user.displayName,
                  };
                  this.firebaseService.addNewDocument(FIRESTORE_COLLECTION.USERS, _user).subscribe(resp => {
                    if (resp) {
                      this.userService._uuid = _uuid;
                      let _url = `${ROUTE.CMS}/${ROUTE.CMS_MAIN}`;
                      let param = undefined;
                      const winfitIndex = this.winfitOnline.baseIndexWinfit;

                      if (!Number.isNaN(winfitIndex.bmi) && !Number.isNaN(winfitIndex.waterNeeded)) {
                        _url = ROUTE.WINFIT_ONLINE;
                        param = {
                          backFromLogin: true,
                        };
                      }
                      this.commonService.gotoURL(_url, param);
                    } else {
                      this.firebaseService.logout();
                      this.commonService.showError();
                    }
                  });
                } else {
                  this.userService._uuid = resp.data?.uuid || '';
                  let _url = `${ROUTE.CMS}/${ROUTE.CMS_MAIN}`;
                  let param = undefined;
                  const winfitIndex = this.winfitOnline.baseIndexWinfit;

                  if (!Number.isNaN(winfitIndex.bmi) && !Number.isNaN(winfitIndex.waterNeeded)) {
                    _url = ROUTE.WINFIT_ONLINE;
                    param = {
                      backFromLogin: true,
                    };
                  }
                  this.commonService.gotoURL(_url, param);
                }
              },
              error: error => {
                console.error(error);
                this.firebaseService.logout();
                this.commonService.showError();
              }
            });
          }
        })
        .catch((error: any) => {
          console.error('login error', error);
          this.commonService.showError();
        });
      }
  }

  loginWithFacebook() {}
  //end region
}
