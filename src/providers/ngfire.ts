import { Injectable } from '@angular/core';
import {
  AngularFire,
  AuthProviders,
  AuthMethods,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import * as firebase from 'firebase';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class NgFire {
  public auth: any;
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public imageUrl: string;
  public user: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
    });

    this.messages = this.af.database.list('messages');
    this.users = this.af.database.list('users');
  }

  // Register
  registerUser(email, password) {
    console.log(email);
    return this.af.auth.createUser({
      email: email,
      password: password,
    });
  }

  // Save information to display on chat screen
  saveUserInfo(id, name, email) {
    return this.af.database.object('registeredUser/' + id).set({
      name: name,
      email: email
    });
  }

  // Login
  loginWithEmail(email, password) {
    return this.af.auth.login(
    {
      email: email,
      password: password,
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    });
  }
  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  }
  addUserInfo(){
    this.users.push({
      email: this.email,
      displayName: this.displayName,
    });
  }

  // Logout the current user
  logout() {
    return this.af.auth.logout();
  }

  sendMessage(text) {
    let message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now(),
    };
    this.messages.push(message);
  }

  sendImage(file: File) {
    let storageRef = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask;
    uploadTask = storageRef.child('images/' + this.af.auth.getAuth().uid + '/' + Date.now() + '/' + file.name).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (error) => {
      console.error('There was an error uploading file to Firebase Storage: ', error);
    }, () => {
      let url = uploadTask.snapshot.downloadURL;
      this.saveImage({
        displayName: this.displayName,
        email: this.email,
        imageUrl: url,
        timestamp: Date.now(),
      });
    });
  }

  saveImage(image: any) {
    this.messages.push(image);
  }
}