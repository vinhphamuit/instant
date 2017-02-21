import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild,
  ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

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
  imageSrc: Observable<string>;

  @Input() imageUrl: string;

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

  onSelectImageFile(event) {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0] as File;
      console.log(file);
      if (file.type.match('image.*')) {
        this.afService.sendImage(file);
      } else {
        this.newImage = "";
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnChanges() {
    if (this.imageUrl) {
      this.imageSrc = this.afService.setImageUrl(this.imageUrl);
    }
  }

  onLoadImage() {
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
