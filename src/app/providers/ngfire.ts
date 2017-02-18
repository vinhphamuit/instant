import { Injectable } from '@angular/core';
import {
  AngularFire,
  AuthProviders,
  AuthMethods
} from 'angularfire2';

@Injectable()
export class NgFire {
  constructor(public af: AngularFire) {}

  // Login
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  // Logout the current user
  logout() {
    return this.af.auth.logout();
  }
}