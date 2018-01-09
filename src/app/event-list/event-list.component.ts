import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [EventService]
})
export class EventListComponent implements OnInit {
  events;
  constructor(private event: EventService) { }

  ngOnInit() {
    this.event.findAllEvents()
    .subscribe((events) => {
      this.events = events;
    });
  }
}
