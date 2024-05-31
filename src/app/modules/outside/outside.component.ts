import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-outside',
  templateUrl: './outside.component.html',
})
export class OutsideComponent implements OnInit, AfterViewInit {
  seoTitle: string = 'SEO.MANAGER_AUTH';

  constructor(
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.firebaseService.init();
  }

  ngAfterViewInit(): void {
    const titleTranslate = this.translateService.instant(this.seoTitle);
    this.title.setTitle(titleTranslate);
  }

}
