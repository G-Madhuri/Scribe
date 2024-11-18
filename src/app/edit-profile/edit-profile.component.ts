import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  message: string = '';

  constructor() {
    this.getProfile();
  }

  ngOnInit(): void {}

  getProfile() {
    let userId = firebase.auth().currentUser?.uid;
    firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        this.user = documentSnapshot.data();
        this.user.id = documentSnapshot.id;
        this.user.displayName = this.user.firstName + ' ' + this.user.lastName;
        console.log(this.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update() {
    this.message = 'Updating Profile...';
    firebase
      .auth()
      .currentUser?.updateProfile({
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
      })
      .then(() => {
        let userId = firebase.auth().currentUser?.uid;
        firebase
          .firestore()
          .collection('users')
          .doc(userId)
          .update({
            firstName: this.user.displayName.split(' ')[0],
            lastName: this.user.displayName.split(' ')[1],
            hobbies: this.user.hobbies,
            interests: this.user.interests,
            bio: this.user.bio,
          })
          .then(() => {
            this.message = 'Profile updated Successfully!';
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }
}
