import { Injectable, inject } from "@angular/core";
import { UserCredential } from "firebase/auth";
import { AppUserModel } from "../models";
import { AppConfigService, CookieStorageHelper } from "../../../../tt-library-angular-porfolio/dist/tt-library-angular-porfolio";

Injectable({
  providedIn: 'root'
})

export class UserService {
  private _user?: AppUserModel;

  constructor() {}

  get user(): AppUserModel | undefined {
    return this._user;
  }

  set user(info: UserCredential) {
    this._user = new AppUserModel(info.user);
  }
}
