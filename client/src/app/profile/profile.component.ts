import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { Datum, User } from './User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  $users: Observable<Datum[]> | undefined;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.$users = this.userService.getUsers();
  }
}
