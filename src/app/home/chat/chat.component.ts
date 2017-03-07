import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { NgFire } from '../../../providers/ngfire';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public messages: FirebaseListObservable<any>;
  imageSrc: string;

  constructor(public afService: NgFire) {
    this.messages = afService.messages;
  }

  ngOnInit() {
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
