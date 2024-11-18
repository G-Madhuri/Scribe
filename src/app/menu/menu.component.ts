import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  loggedIn: boolean = false;
  user: any;
  l: string = 'navbar-collapse collapse';

  constructor() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit() {}

  logout() {
    firebase.auth().signOut();
  }

  onClick() {
    if (this.l == 'navbar-collapse collapse') {
      this.l = 'navbar-collapse collapse show';
    } else {
      this.l == 'navbar-collapse collapse';
    }
  }
}
