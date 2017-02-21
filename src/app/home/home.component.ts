import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Inject } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { NgFire } from '../../providers/ngfire';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public newMessage: string;
  public messages: FirebaseListObservable<any>;

  constructor(public afService: NgFire) {
    this.messages = afService.messages;
  }

  ngOnInit() {
  }

  sendMessage() {
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  
  isMe(email) {
    if (email == this.afService.email) {
      return true;
    } else {
      return false;
    }
  }
  isYou(email) {
    if (email == this.afService.email) {
      return false;
    } else {
      return true;
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.log('Scroll to bottom failed');
    }
  }
}
