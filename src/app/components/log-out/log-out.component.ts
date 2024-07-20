import { Component, OnInit } from '@angular/core';
import { CommonService, FirebaseService, ROUTE } from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-log-out',
  templateUrl: './log-out.component.html',
  standalone: true,
})
export class LogOutComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.firebaseService.logout().subscribe(resp => {
      if (resp) {
        this.commonService.gotoURL(`${ROUTE.AUTH}/${ROUTE.AUTH_LOGIN}`);
      } else {
        this.commonService.showError();
      }
    });
  }

}
