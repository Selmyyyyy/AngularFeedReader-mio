import { inject, Injectable } from '@angular/core';
import { Feed } from '../model/feed';
import { FirebaseService } from './firebase-service';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {


  firebase = inject(FirebaseService);
  authServ = inject(AuthService);
  db = getFirestore(this.firebase.app);

  userFeeds: Feed[] = [];

  addFeed(newFeed: Feed) {
    if (this.authServ.auth.currentUser) {
      this.userFeeds.push(newFeed);
      const userRef = doc(this.db, 'users', this.authServ.auth.currentUser.uid);
      return setDoc(userRef, { feeds: this.userFeeds }, { merge: true });
    }

    return Promise.reject('User not authenticated');
  }

  getUserFeeds() {
    if (this.authServ.auth.currentUser) {
      const userRef = doc(this.db, 'users', this.authServ.auth.currentUser.uid);    
      return getDoc(userRef).then(result => {
        //console.log(result.data());
        this.userFeeds = result.data()!['feeds'];
       //console.log(this.userFeeds)
       return this.userFeeds
      });
    }
    return Promise.reject('User not authenticated')
  }
  
}
