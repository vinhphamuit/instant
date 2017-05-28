import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AngularFire } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;
  public isCollapsed = true;

  constructor(public afService: AngularFire, private router: Router) {
    // console.log(afService);
    // Asynchronously check if user is logged in
    this.afService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not logged in');
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        } else {
          console.log('Logged in');
          // console.log(auth);
          if (auth.displayName) {
            this.afService.displayName = auth.displayName;
            this.afService.email = auth.email;
          } else {
            this.afService.displayName = auth.email;
            this.afService.email = auth.email;
          }
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  logout() {
    this.afService.logout();
  }
}
