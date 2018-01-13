import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    isLoggedOut: boolean = false;

    fullNameValue: string;
    emailValue: string;
    passwordValue: string;

    errorMessage: string;

    loginEmail: string;
    loginPassword: string;

    loginErrorMessage: string;


    constructor(
      private userservice: UserService,
      private router: Router
    ) { }

    ngOnInit() {
      this.userservice.checklogin()
        // If success, we are logged in.
        .then((resultFromApi) => {
            this.router.navigate(['/user']);
        })

        // Even if you don't do anything on error, catch to avoid a console error.
        .catch((err) => {
            this.isLoggedOut = true;
        });
    }

    doSignUp() {
      this.userservice.signup(this.fullNameValue, this.emailValue, this.passwordValue)
        .then((resultFromApi) => {
            // clear form
            console.log(this.fullNameValue)
            this.fullNameValue = "";
            this.emailValue = "";
            this.passwordValue = "";

            // clear error message
            this.errorMessage = "";

            // redirect to /camels
            this.router.navigate(['/user']);
        })
        .catch((err) => {
            const parsedError = err.json();
            this.errorMessage = parsedError.message + ' 😤TEST';
        });
    } // close doSignUp()

    doLogin() {
      this.userservice.login(this.loginEmail, this.loginPassword)
        .then((resultFromApi) => {
            // clear the form
            this.loginEmail = "";
            this.loginPassword = "";

            // clear the error message
            this.loginErrorMessage = "";

            // redirect to /camels
            this.router.navigate(['/user']);
        })
        .catch((err) => {
            const parsedError = err.json();
            this.loginErrorMessage = parsedError.message + ' 😤';
        });
    } // close doLogin()

  }
