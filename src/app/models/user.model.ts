import { isBoolean, isEmpty, size } from "lodash";
import { IReloadUserInfo, IStsTokenManager, IUserResp } from "../interfaces";

export class AppUserModel {
  private stsTokenManager?: IStsTokenManager;

  emailVerified: boolean = false;
  isAnonymous: boolean = false;

  displayName: string = '';
  email: string = '';
  phoneNumber: string = '';

  reloadUserInfo?: IReloadUserInfo;

  constructor(user?: IUserResp) {
    if (user) {
      this.checkForString('displayName', user.displayName);
      this.checkForString('email', user.email);
      this.checkForString('phoneNumber', user.phoneNumber);

      this.checkForBoolean('emailVerified', user.emailVerified);
      this.checkForBoolean('isAnonymous', user.isAnonymous);

      if (typeof user['stsTokenManager'] === 'object' && size(user['stsTokenManager'])) {
        this.stsTokenManager = user['stsTokenManager'];
      }

      if (typeof user['reloadUserInfo'] === 'object' && size(user['reloadUserInfo'])) {
        this.reloadUserInfo = user['reloadUserInfo'];
      }
    }
  }

  get refreshToken(): string {
    return this.stsTokenManager?.refreshToken || '';
  }

  private checkForString(
    param:
      | 'displayName'
      | 'email'
      | 'phoneNumber',
    value: any,
  ) {
    if (value !== undefined) {
      if (value && !isEmpty(value)) {
        this[param] = value;
      }
    }
  }

  private checkForBoolean(param: 'emailVerified' | 'isAnonymous', value: any) {
    if (value !== undefined) {
      if (isBoolean(value)) {
        this[param] = value;
      } else {
        this[param] = value === 'true';
      }
    }
  }

  // private checkForNumber(
  //   param: 'pageNumber' | 'pageSize' | 'totalElements' | 'totalPages',
  //   value: any,
  //   keepZero = false,
  // ) {
  //   if (value !== undefined) {
  //     if ((value || (keepZero === true && value === 0)) && !isNaN(+value)) {
  //       this[param] = +value;
  //     }
  //   }
  // }
}
