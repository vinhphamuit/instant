import { Component, Input } from '@angular/core';
import { AngularFire } from 'app/shared';
import { HomeComponent } from 'app/home/home.component';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent {
  @Input() newChannel;

  constructor(private afService: AngularFire) {}

  createChannel(event, channelName) {
    event.preventDefault();
    this.afService.createChannel(channelName);
    this.newChannel = false;
  }
}
