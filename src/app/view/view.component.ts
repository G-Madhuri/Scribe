import { Component, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  post: any = {};
  postId: string = '';

  constructor(public activatedRoute: ActivatedRoute, public ngZone: NgZone) {
    let postId = (
      this.activatedRoute.snapshot.paramMap.get('postId') || ''
    ).toString();
    this.postId = postId;

    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((docSnapshot) => {
        this.post = docSnapshot.data();
        console.log(this.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {}
}
