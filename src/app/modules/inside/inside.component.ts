import { Component, OnInit } from '@angular/core';
import { LazyLoadScriptService } from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-inside',
  templateUrl: './inside.component.html',
})
export class InsideComponent implements OnInit {
  LOAD_LINK_COMPONENT: string = 'http://localhost:3000/static/js/bundle.js';

  constructor(private lazyLoadService: LazyLoadScriptService) { }

  ngOnInit() {
    this.lazyLoadService.loadScript(this.LOAD_LINK_COMPONENT, {defer: true}).subscribe(_ => {
      console.log('Jquery is loaded!')
    });
  }

}
