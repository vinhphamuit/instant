import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild,
  ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { NgFire } from '../../providers/ngfire';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public newMessage: string;
  public newImage: any;
  public messages: FirebaseListObservable<any>;
  
  constructor(public afService: NgFire, private cd: ChangeDetectorRef) {
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
