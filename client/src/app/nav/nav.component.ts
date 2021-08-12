import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  token: any = '';

  constructor(public accountService: AccountService  ) { }

  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model)
        .subscribe(
          response => console.log(response),
          error => console.log(error),
          () => console.log('Complete')
        )
  }

  logout() {
    this.accountService.logout();
  }

}
