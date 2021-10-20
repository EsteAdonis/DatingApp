import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user !== null ? (user.hasOwnProperty('username') ? user : null) : null;
    this.accountService.setCurrentUser(user);
  }
}
