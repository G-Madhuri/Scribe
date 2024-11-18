import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrl: './myblogs.component.css',
})
export class MyblogsComponent implements OnInit {
  user: any = {};
  posts: any[] = [];
  constructor() {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
    this.getPosts();
  }

  ngOnInit(): void {}

  getPosts() {
    firebase
      .firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        this.posts = querySnapshot.docs;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPostCreated() {
    this.posts = [];
    this.getPosts();
  }

  onDelete() {
    this.posts = [];
    this.getPosts();
  }
}
