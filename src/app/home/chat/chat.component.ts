
import { Component, AfterViewChecked, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { AngularFire } from '../../shared';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked, OnChanges {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() channelId;

  public messages: FirebaseListObservable<any>;
  imageSrc: string;
  public newMessage: string;
  public newImage: any;

  constructor(public afService: AngularFire) {}

  ngOnChanges() {
    this.messages = this.afService.getMessages(this.channelId);
  }

  sendMessage() {
    this.afService.sendMessage(this.channelId, this.newMessage);
    this.newMessage = '';
  }

  onSelectFile(event) {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0] as File;
      console.log(file);
      this.afService.sendFile(this.channelId, file)
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Scroll to bottom failed');
    }
  }

  isMe(email) {
    if (email === this.afService.email) {
      return true;
    } else {
      return false;
    }
  }
  isYou(email) {
    if (email === this.afService.email) {
      return false;
    } else {
      return true;
    }
  }
}
