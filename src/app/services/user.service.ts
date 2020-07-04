import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../user/user';

import {  } from 'rxjs/add/operator/catch'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // status for login
  status = false;

  // user who login now
  user =  null;

  // token generated in backend
  getGeneratedToken = null;

  // user is admin or not
  userIsAdmin = 0;

  constructor(private http: HttpClient) { }

  // subscribe on login
  isLoggedIn = new BehaviorSubject(null);
  loggedIn = this.isLoggedIn.asObservable();
  changeLoggedInStatus(status) {
    this.isLoggedIn.next(status);
  }

  // subscribe on token 
  token = new BehaviorSubject(null);
  tokenStatus = this.token.asObservable();
  changeTokenStatus(status) {
    this.token.next(status);
  }

  // login web service
  /**
   * 
   * @param loginRequest 
   * login() --- function ---
   * return token what we need and 
   * message about token status created or not and 
   * user who login
   * 
   * 
   */
  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'username or password invalid');
  }

  login(loginRequest) {
      return this.http.post('http://localhost:8080/userlogin/auth/',loginRequest).pipe(
        catchError(this.errorHandler)
      );
  }

  // register web service
  /**
   * 
   * @param user 
   * register() --- function --- 
   * return user that just register now
   * 
   * 
   */
  register(user: User) {
    return this.http.post('http://localhost:8080/userlogin/auth/register',user);
  }

  // get all web service
  /**
   * 
   * @param token 
   * getAll() --- function ---
   * return all users in DB
   * 
   * but it have an authorization on it
   * just send token in header with (name):Authorization
   * and (body): bearer token
   * to submit authorization 
   * and return what you need
   * 
   * java pro.....
   * 
   * 
   * 
   */
  getAll(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get('http://localhost:8080/userlogin/',requestOptions);
  }

  // get all web service check admin first
  /**
   * 
   * @param token 
   * getAll() --- function ---
   * return all users in DB
   * 
   * but it have an authorization on it
   * just send token in header with (name):Authorization
   * and (body): bearer token
   * 
   *send token to check admin
   *
   * to submit authorization 
   * and return what you need
   * 
   * java pro.....
   * 
   * 
   * 
   */
  getAllUserByCheckAdmin(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post('http://localhost:8080/userlogin/checkAdminThenGetAllUsers',token,requestOptions);
  }

}
