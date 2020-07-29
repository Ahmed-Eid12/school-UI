import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(
    private http: HttpClient
    ) { }

  // backend server URI
  URI = 'https://localhost:8443/';

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
   * method getAllUserSectionList
   */

  getAllUserSectionList(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.URI+'schoole2ss/integration/getAllUserSectionList/',requestOptions);
  }

/**+
   * 
   * method getAllUserSectionList
   */

  getAllUserSysParentisList(token) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'bearer '+token,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.URI+'schoole2ss/integration/getAllSysParentisList/',requestOptions);
  }

}
