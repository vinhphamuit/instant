import { Component } from '@angular/core';
import {
  AngularFire,
  AuthProviders,
  AuthMethods,
  FirebaseListObservable
} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  messageVal: string = '';

  constructor(public ngFire: AngularFire) {
    this.items = ngFire.database.list('/messages', {
      query: {
        limitToLast: 5
      }
    });

    this.ngFire.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  login() {
    this.ngFire.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  }

  chatSend(theMessage: string) {
    this.items.push({ message: theMessage, name: this.name.facebook.displayName });
    this.messageVal = '';
  }
}
