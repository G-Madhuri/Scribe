import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name:string="DUbUk";
  amount:number=1999.123;
  dateOfBirth=new Date();

}
