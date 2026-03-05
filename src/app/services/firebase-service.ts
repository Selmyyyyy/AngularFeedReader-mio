import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {


  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
  }
}
