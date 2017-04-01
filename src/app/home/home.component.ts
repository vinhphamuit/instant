import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { NgFire } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public isLoggedIn: boolean;

  constructor(private afService: NgFire) {
     this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not logged in');
          this.isLoggedIn = false;
        } else {
          console.log('Logged in');
          if (auth.facebook) {
            this.afService.displayName = auth.facebook.displayName;
            this.afService.email = auth.facebook.email;
          } else {
            this.afService.displayName = auth.auth.email;
            this.afService.email = auth.auth.email;
          }
          this.isLoggedIn = true;
        }
      }
    );
  }

  logout() {
    this.afService.logout();
  }
}
