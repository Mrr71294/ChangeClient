import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

  findAllEvents() {
    return this.http.get(`${this.BASE_URL}/api/event/findAll`)
      .map((res) => res.json());
  }

  findOneEvent(id) {
    return this.http.get(`${this.BASE_URL}/api/event/findOne/${id}`)
      .map((res) => res.json());
  }

  updateEvent(event) {
    return this.http.put(`${this.BASE_URL}/api/event/update/${event.id}`, event)
      .map((res) => res.json());
  }

  deleteEvent(id) {
    return this.http.delete(`${this.BASE_URL}/api/event/delete/${id}`)
      .map((res) => res.json());
  }
}
