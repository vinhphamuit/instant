import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NgFire } from './shared';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './home/chat/chat.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyC5Phwza_saEPSgAcjsa6XDRr3BQOjjYBg',
  authDomain: 'instant-4cf24.firebaseapp.com',
  databaseURL: 'https://instant-4cf24.firebaseio.com',
  storageBucket: 'instant-4cf24.appspot.com',
  messagingSenderId: '741365764902'
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ChatComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [NgFire],
  bootstrap: [AppComponent]
})
export class AppModule { }
