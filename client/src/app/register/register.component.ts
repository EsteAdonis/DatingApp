import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    console.log(this.usersFromHomeComponent);
  }

  register(){
    this.accountService.register(this.model)
        .subscribe(
          response => { console.log(response); this.cancel(); },
          error => { 
              console.log(error),
              this.toastr.error(error.error);
            }
        )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
