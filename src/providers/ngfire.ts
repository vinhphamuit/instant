import { Injectable, Component, Inject } from '@angular/core';
import {
  AngularFire,
  AuthProviders,
  AuthMethods,
  FirebaseListObservable,
  FirebaseObjectObservable, 
  FirebaseApp
} from 'angularfire2';
import * as firebase from 'firebase';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

@Injectable()
export class NgFire {
  public auth: any;
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public imageUrl: string;
  public user: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
        }
    });
    this.auth = firebaseApp.auth();

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
    if (file) {
      let image = {
        displayName: this.displayName,
        email: this.email,
        imageUrl: LOADING_IMAGE_URL,
        timestamp: Date.now(),
      };
      this.messages.push(image).then((data) => {
        // Upload the image
        const uploadTask = this.auth.storage.ref(this.af.auth.getAuth().uid + '/' + Date.now() + '/' + file.name)
          .put(file);
        // Listen for upload completion
        uploadTask.on('state_changed', null, (error) => {
          console.error('There was an error uploading file to Firebase Storage: ', error);
        }, () => {
          // Get the file's Storage URI and update the chat message placeholder
          const filePath = uploadTask.snapshot.metadata.fullPath;
          data.update({ imageUrl: this.auth.storage.ref(filePath).toString() });
        });
      });
    }
  }

  setImageUrl(imageUrl: string): Observable<string> {
    if (!imageUrl.startsWith('gs://')) {
      return Observable.of(imageUrl);
    }

    // If image is a Firebase Storage URI, we fetch the URL
    const subject = new BehaviorSubject<string>(LOADING_IMAGE_URL);

    this.auth.storage.refFromURL(imageUrl).getMetadata().then((metadata) => {
      subject.next(metadata.downloadURLs[0]);
      subject.complete();
    });
    return subject.asObservable();
  }
}