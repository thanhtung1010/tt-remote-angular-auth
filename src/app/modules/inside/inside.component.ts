import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'tt-library-angular-porfolio';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'tt-inside',
  templateUrl: './inside.component.html',
})
export class InsideComponent implements OnInit {
  LOAD_LINK_COMPONENT: string = 'http://localhost:3000/static/js/bundle.js';
  name: string = '';
  email: string = '';

  constructor(
    private lazyLoadService: LazyLoadScriptService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // this.lazyLoadService.loadScript(this.LOAD_LINK_COMPONENT, {defer: true}).subscribe(_ => {
    //   console.log('Jquery is loaded!')
    // });
    if (this.userService.user) {
      this.name = this.userService.user.displayName;
      this.email = this.userService.user.email;
    }
  }

}
