import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ UserService ]
})
export class UserListComponent implements OnInit {
  users;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.findAllUsers()
    .subscribe((users) => {
      this.users = users;
    });
  }
}
