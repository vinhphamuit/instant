import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class AngularFire {
  public auth: any;
  public channels: FirebaseListObservable<any>;
  // public channelMessages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  public imageUrl: string;
  public user: FirebaseObjectObservable<any>;
  public defaultChannelId: ReplaySubject<any> = new ReplaySubject(1);
  channelId;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.db.object('users/' + auth.uid);
        }
    });

    this.channels = this.db.list('channels');
    this.users = this.db.list('users');
    this.db.list('channels', {
      query: {
          limitToFirst: 1
      }
    }).subscribe(items => {
      this.defaultChannelId.next(items[0].$key);
    });
  }

  getMessages(channel): FirebaseListObservable<any> {
    return this.db.list('channelMessages/' + channel);
  }

  // Register
  registerUser(email, password) {
    console.log(email);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // Save information to display on chat screen
  saveUserInfo(id, name, email) {
    return this.db.object('users/' + id).set({
      email: email,
      displayName: name
    });
  }

  // Login
  loginWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  addUserInfo() {
    this.users.push({
      email: this.email,
      displayName: this.displayName,
    });
  }

  // Logout the current user
  logout() {
    return this.afAuth.auth.signOut();
  }

  sendMessage(channel, text) {
    const message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now(),
    };
    this.db.list('channelMessages/' + channel).push(message);
  }

  sendFile(channel, file: File) {
    let propName: String;
    const storageRef = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask;
    if (file.type.match('image.*')) {
      propName = 'images/';
      
    } else {
      propName = 'files/';
    }
    uploadTask = storageRef.child(propName + this.afAuth.auth.currentUser.uid + '/' + Date.now() + '/' + file.name).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, (error) => {
      console.error('There was an error uploading file to Firebase Storage: ', error);
    }, () => {
      const url = uploadTask.snapshot.downloadURL;
      if (file.type.match('image.*')) {
        this.saveFile(channel, {
          displayName: this.displayName,
          email: this.email,
          imageUrl: url,
          timestamp: Date.now(),
        });
      } else {
        this.saveFile(channel, {
          displayName: this.displayName,
          email: this.email,
          fileName: file.name,
          fileUrl: url,
          timestamp: Date.now(),
        });
      }
    });
  }

  saveFile(channel, file: any) {
    this.db.list('channelMessages/' + channel).push(file);
  }

  createChannel(channelName) {
    this.channels.push({
      name: channelName
    }).then((snap) => {
      const channelId = snap.key;
    });
  }
}
