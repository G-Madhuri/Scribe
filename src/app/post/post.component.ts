import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input('post') post: any;
  @Output('onDelete') onDelete = new EventEmitter();
  postData: any = {};
  user: any = {};

  constructor() {}

  ngOnInit(): void {
    this.postData = this.post.data();
    console.log(this.postData);
    this.user = firebase.auth().currentUser;
  }

  delete() {
    firebase.firestore().collection('posts').doc(this.post.id).delete();
    this.onDelete.emit();
  }
}
