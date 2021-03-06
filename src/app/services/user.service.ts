import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../classServices/user';

import {  } from 'rxjs/add/operator/catch'
import { UserInformations } from '../classServices/user-informations';

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

  // user registered code
  userRegisteredCode = null;

  // user registration id
  userRegisteredId = 0;

  constructor(private http: HttpClient) { }

  // backend server URI
  URI = 'https://localhost:8443/';

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
      return this.http.post(this.URI+'userlogin/auth/',loginRequest).pipe(
        catchError(this.errorHandler)
      );
  }

  // register web service
  /**
   * 
   * @param user 
   * register() --- function --- 
   * addNewUserParentis()
   * addNewUserInformation()
   * return user that just register now
   * 
   * 
   */
  register(user: User) {
    return this.http.post(this.URI+'userlogin/auth/register',user);
  }

  addNewUserParentis(parentis , userCode, sysParentisId,token) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post(this.URI+'userlogin/auth/saveNewParentis/' + userCode + "/"+sysParentisId
    , parentis ,requestOptions);
  }

  addNewUserInformation(userInfo , userCode , userSection , image,token) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let formData = new FormData();
    formData.append('userInfo' , JSON.stringify(userInfo));
    formData.append('file' , image);
    return this.http.post(this.URI+'userlogin/auth/saveNewUserInfo/' + userCode+"/"+userSection , formData,requestOptions);
  }

  addNewPreviousJob(preJob , userId) {
    return this.http.post(this.URI+'userlogin/auth/saveNewPreviousJob/' + userId , preJob);
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
    return this.http.get(this.URI+'userlogin/',requestOptions);
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
    return this.http.post(this.URI+'userlogin/checkAdminThenGetAllUsers',token,requestOptions);
  }

}
