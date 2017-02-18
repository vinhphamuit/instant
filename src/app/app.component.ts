import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgFire } from '../providers/ngfire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;

  constructor(public afService: NgFire, private router: Router) {
    // Asynchronously check if user is logged in
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not logged in');
          this.isLoggedIn = false;
          this.router.navigate(['login']);
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
          this.router.navigate(['']);
        }

      }
    )
  }

  logout() {
    this.afService.logout();
  }
}
