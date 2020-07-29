import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminIntegrationService {

  constructor(private http: HttpClient) { }
  // backend server URI
  URI = 'https://localhost:8443/schoole2ss/adminintegration/';


  /**
   * 
   * 
   * return error
   */
  errorHandler(message, error: HttpErrorResponse ) {
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
      message);
  }

  /**+
   * 
   * method getUsersHaveNoInformation
   */

  getUsersHaveNoInformation(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.URI+'userHaveNoInfo/',requestOptions);
  }

  /**+
   * 
   * method getUsersHaveNoInformation
   */

  getCountUsersHaveNoInformation(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.URI+'countCserHaveNoInfo/',requestOptions);
  }

  /**
   * all about user section add update get and delete ....
   */
  // get all users section
  getAllUsersSection(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.URI+'getAllUserSections/',requestOptions);
  }

  // get user section by id
  getUsersSectionById(token,userSectionId) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.URI+'getUserSectionById/'+userSectionId,requestOptions);
  }

  // add or save new user section
  saveNewUsersSection(token,userSection) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post(this.URI+'saveNewUserSection/',userSection,requestOptions);
  }

  // update user section
  updateUsersSection(token, userSectionId, userSection) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.put(this.URI+'updateNewUserSection/'+userSectionId,userSection,requestOptions);
  }

  // delete user section by id
  deleteUsersSectionById(token, userSectionId) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.delete(this.URI+'deleteUserSectionById/'+userSectionId,requestOptions);
  }
}
