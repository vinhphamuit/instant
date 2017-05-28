import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { AngularFire } from '../shared';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public isLoggedIn: boolean;
  public newChannel = false;
  public channels: FirebaseListObservable<any>;
  public activeChannel;
  public channelId;

  constructor(private afService: AngularFire) {
    this.afService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Not logged in');
          this.isLoggedIn = false;
        } else {
          console.log('Logged in');
          this.isLoggedIn = true;
        }
      }
    );

    this.channels = afService.channels;
  }

  logout() {
    this.afService.logout();
  }

  selectNewChannel() {
    this.activeChannel = null;
    this.channelId = '';
    this.newChannel = true;
  }

  selectChannel(channel) {
    this.activeChannel = channel;
    this.newChannel = false;
    this.channelId = channel.$key;
  }
}
