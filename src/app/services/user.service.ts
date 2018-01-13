import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

    // an argument for each "req.body" in the API route
    signup(theFullName, theEmail, thePassword) {
        console.log(theFullName)

        return this.http
          .post(
            environment.apiBase + '/api/user/signup',

            // Form body information to send to the back end (req.body)
            {
              name: theFullName,
              email: theEmail,
              password: thePassword,

            },

            // Send the cookies across domains
            { withCredentials: true }
          )


          // Convert from observable to promise
          .toPromise()

          // Parse the JSON
          .then(res => res.json());
    } // close signup()


    login(theEmail, thePassword) {
        return this.http
          .post(
            environment.apiBase + '/api/user/login',

            // Form body information to send to the back end (req.body)
            {
              email: theEmail,
              password: thePassword
            },

            // Send the cookies across domains
            { withCredentials: true }
          )

          // Convert from observable to promise
          .toPromise()

          // Parse the JSON
          .then(res => res.json());
    } // close login()


    logout() {
        return this.http
          .post(
            environment.apiBase + '/api/user/logout',

            // Nothing to send to the back end (req.body)
            {},

            // Send the cookies across domains
            { withCredentials: true }
          )

          // Convert from observable to promise
          .toPromise()

          // Parse the JSON
          .then(res => res.json());
    } // close logout()


    checklogin() {
        return this.http
          .get(
            environment.apiBase + '/api/user/checklogin',

            // Send the cookies across domains
            { withCredentials: true }
          )

          // Convert from observable to promise
          .toPromise()

          // Parse the JSON
          .then(res => res.json());
    } // close checklogin()


  findAllUsers() {
    return this.http.get(`${this.BASE_URL}/api/user/findAll`)
      .map((res) => res.json());
  }

  findOneUser(id) {
    return this.http.get(`${this.BASE_URL}/api/user/findOne/${id}`)
      .map((res) => res.json());
  }

  updateUser(user) {
    return this.http.put(`${this.BASE_URL}/api/user/update/${user.id}`, user)
      .map((res) => res.json());
  }

  deleteUser() {
    return this.http
    .delete(
      `${environment.apiBase}/api/user/delete`,
      // Send the cookies across domains
      { withCredentials: true }
    )
    // Convert from observable to promise
    .toPromise()
    // Parse the JSON
    .then(res => res.json());
  } // close deleteUser()
}
