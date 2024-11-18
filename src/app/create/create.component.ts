import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { error } from 'console';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  content: string = '';

  title: string = '';
  @Output('postCreated') postCreated = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  createPost() {
    firebase
      .firestore()
      .collection('posts')
      .add({
        title: this.title,
        content: this.content,
        owner: firebase.auth().currentUser?.uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((data) => {
        console.log(data);
        this.postCreated.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
