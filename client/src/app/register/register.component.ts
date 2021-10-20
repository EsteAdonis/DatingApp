import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    var val = Validators;
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['Username', val.required],
      knownAs: ['knownAs', val.required],
      dateOfBirth: ['Date Of Birth', val.required],
      city: ['City', val.required],
      country: ['Country', val.required],                              
      password: ['Password', [val.required, val.minLength(4), val.maxLength(8)]],
      confirmPassword: ['Confirm Password', [val.required, this.matchValues('password')]]
    })

    this.registerForm.controls.password.valueChanges.subscribe( () => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value ===  control?.parent?.get(matchTo).value ? null : {isMatching: true}
    }
  }

  register(){
    this.accountService.register(this.registerForm.value)
        .subscribe(
          response => { 
            this.router.navigateByUrl('/members'); 
            this.cancel(); },
          error => { 
              this.validationErrors = error;
            }
        )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
