import { Injectable } from '@angular/core';
import { error } from 'console';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  signup(email: string, password: string, firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          response.user
            ?.updateProfile({
              displayName: firstName + ' ' + lastName,
              photoURL:
                'https://static.vecteezy.com/system/resources/thumbnails/009/209/212/small/neon-glowing-profile-icon-3d-illustration-vector.jpg',
            })
            .then(() => {
              resolve(response.user);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
