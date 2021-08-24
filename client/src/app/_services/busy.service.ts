import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
 
// www.npmjs.com/package/ngx-spinner


@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;

    this.spinnerService.show(undefined, {
      type: 'ball-clip-rotate-pulse',
      bdColor: 'rgba(0,0,0, 0.6)',
      color: '#bd2828',
      size: 'large'
    });
  }

  idle() {
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
