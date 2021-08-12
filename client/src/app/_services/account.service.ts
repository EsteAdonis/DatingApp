import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }
  
  // Observables are lazy collections of multiple values over time

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model)
            .pipe(
              map((response: User) => {
                    const user = response;
                    if (user) {
                      localStorage.setItem('user', JSON.stringify(user));
                      this.currentUserSource.next(user);
                    }
                  }),
              catchError(this.handleHttpError)
            )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model)
           .pipe(
             map( user => {
               if (user) {
                  localStorage.setItem('user', JSON.stringify(user));
                  this.currentUserSource.next(user);
              }
             }),
             catchError(this.handleHttpError)
           )

  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }

  private handleHttpError(error: HttpErrorResponse): Observable<any> {
    let dataError = Object.assign({});
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);    
  }  
}
