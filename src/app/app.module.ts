import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyC5Phwza_saEPSgAcjsa6XDRr3BQOjjYBg",
  authDomain: "instant-4cf24.firebaseapp.com",
  databaseURL: "https://instant-4cf24.firebaseio.com",
  storageBucket: "instant-4cf24.appspot.com",
  messagingSenderId: "741365764902"
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