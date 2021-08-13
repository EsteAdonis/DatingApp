import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService, 
              private router: Router,
              private toastr: ToastrService ) { }

  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model)
        .subscribe(
          () => this.router.navigateByUrl('/members'),
          error => {
                console.log(error),
                this.toastr.error(error.error)
          },                 
          () => console.log('Complete')
        )
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
