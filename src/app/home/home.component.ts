import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { AngularFire } from '../shared';
import { FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public isLoggedIn: boolean;
  public newChannel = false;
  public toggleSidebar = false;
  public channels: FirebaseListObservable<any>;
  public channelId: string;

  constructor(private afService: AngularFire) {
    this.afService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }
    );

    this.channels = afService.channels;
    this.afService.defaultChannelId.subscribe(value => this.channelId = value);
  }

  logout() {
    this.afService.logout();
  }

  selectNewChannel() {
    this.channelId = '';
    this.newChannel = true;
  }

  selectChannel(channel) {
    this.newChannel = false;
    this.channelId = channel.$key;
  }
}
