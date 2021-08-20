import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/members';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm = Object.assign({});
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  member: Member = Object.assign({});
  user: User = Object.assign({});



  constructor(private AccountService: AccountService, 
              private membersService: MembersService,
              private toastr: ToastrService) { 
    this.AccountService.currentUser$
        .pipe(take(1))
        .subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.user.username)
        .subscribe( member => this.member = member );
  }

  updateMember() {
    this.membersService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm?.reset(this.member);
    })
  }
}
