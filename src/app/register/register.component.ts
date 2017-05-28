import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from '../shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public error: any;

  constructor(private afService: AngularFire, private router: Router) {}

  register(event, name, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfo(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      }).catch((error) => {
        this.error = error;
      });
    }).catch((error) => {
      this.error = error;
      console.log(error);
    });
  }
}
