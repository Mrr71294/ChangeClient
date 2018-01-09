import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

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

  deleteUser(id) {
    return this.http.delete(`${this.BASE_URL}/api/user/delete/${id}`)
      .map((res) => res.json());
  }
}
