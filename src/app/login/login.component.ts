import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  message: string = '';
  displayName: string = '';
  userError: any;
  user: any;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this.authService
      .login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);

        this.message = 'You have logged in successfully!';
        this.router.navigate(['myblogs']);
      })
      .catch((error) => {
        console.log(error);
        this.userError = error;
      });
  }
}
