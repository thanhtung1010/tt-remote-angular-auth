import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'tt-library-angular-porfolio';

@Component({
  selector: 'tt-outside',
  templateUrl: './outside.component.html',
})
export class OutsideComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.init();
  }

}
