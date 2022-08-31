import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CustHttpClientService } from '../services/user-http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],


})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  login: any;

  res!: boolean;
  submitted: boolean = false;
  formBuilder: any;
  // public userName: string = '';
 

  constructor(  private router: Router,private custSer: CustHttpClientService){
      this.loginForm = new FormGroup({
       userId: new FormControl(),
      userName: new FormControl(),
      userPass: new FormControl()
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      userPass: ['', Validators.required]
    });
  }

  get loginData() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.login = this.loginForm.value;
    console.log(this.loginForm.value);
    this.custSer
      .loginvalidate(
        this.login.userId,
        this.login.userName,
        this.login.userPass
      )
      .subscribe((Response: any) => {
        this.res = Response;
      });

    if (this.res == true) {
      console.log(this.res);
      alert('Welcome to FinEase');
      localStorage.setItem('userName', this.login.userName);
      localStorage.setItem('userId', this.login.userId);
      sessionStorage.setItem('userId', this.login.userId);
      sessionStorage.setItem('userName', this.login.userName);
      // this.router.navigate(['customer']);
    } else if (this.res == false) {
      alert('User not found');
    }

    (error: string) => {
      alert(' User already exsit!!' + error);
      //Error callback
      console.error('error caught in component', error);
      //throw error;   //You can also throw the error to a global error handler
    };
  }
}



 