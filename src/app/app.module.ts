import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCHwsquncw1q36mJI1728y8CYKuEoWOLYs",
  authDomain: "ng-chat-9fb08.firebaseapp.com",
  databaseURL: "https://ng-chat-9fb08.firebaseio.com",
  storageBucket: "ng-chat-9fb08.appspot.com",
  messagingSenderId: "617714781708"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }