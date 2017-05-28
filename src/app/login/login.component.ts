import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public error: any;

  constructor(public afService: AngularFire, private router: Router) {}

  loginWithFacebook() {
    this.afService.loginWithFacebook().then((data) => {
      // Send to the homepage if logged in
      this.afService.addUserInfo();
      this.router.navigate(['']);
    });
  }
  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    }).catch((error: any) => {
      if (error) {
        this.error = error;
      }
    });
  }
}
