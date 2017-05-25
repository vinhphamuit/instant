
import { Component, AfterViewChecked, ElementRef, ViewChild, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { NgFire } from '../../shared';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() channelId;

  public messages: FirebaseListObservable<any>;
  imageSrc: string;
  public newMessage: string;
  public newImage: any;


  constructor(public afService: NgFire) {
    afService.receiveMessages(this.channelId);
    this.messages = afService.channelMessages;
  }

  sendMessage() {
    this.afService.sendMessage(this.channelId, this.newMessage);
    this.newMessage = '';
  }

  onSelectFile(event) {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0] as File;
      console.log(file);
      if (file.type.match('image.*')) {
        this.afService.sendImage(this.channelId, file);
      } else {
        this.afService.sendFile(this.channelId, file);
      }
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
