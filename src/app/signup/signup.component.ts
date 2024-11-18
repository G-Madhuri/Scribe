import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { group } from 'console';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string = '';
  userError: any;

  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.passmatch('password', 'confirmPassword'),
      }
    );
  }

  passmatch(p: string, c: string) {
    return (group: FormGroup) => {
      let password = group.controls[p];
      let confirmPassword = group.controls[c];
      if (password.value == confirmPassword.value) {
        return;
      } else {
        confirmPassword.setErrors({
          notEqualPassword: true,
        });
      }
    };
  }
  onSubmit(signupform) {
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;

    this.authService
      .signup(email, password, firstName, lastName)
      .then((user: any) => {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            firstName: signupform.value.firstName,
            lastName: signupform.value.lastName,
            email: signupform.value.email,
            photoURL: user.photoURL,
            interests: '',
            bio: '',
            hobbies: '',
          })
          .then(() => {
            this.message = "You've signed up successfully! Please login";
          });
      })
      .catch((error) => {
        console.log(error);
        this.userError = error;
      });
  }

  ngOnInit(): void {}
}
