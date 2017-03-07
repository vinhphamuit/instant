import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { NgFire } from '../../providers/ngfire';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public newMessage: string;
  public newImage: any;

  constructor(public afService: NgFire) {  }

  ngOnInit() {
  }

  sendMessage() {
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  onSelectFile(event) {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0] as File;
      console.log(file);
      if (file.type.match('image.*')) {
        this.afService.sendImage(file);
      } else {
        this.afService.sendFile(file);
      }
    }
  }
}
