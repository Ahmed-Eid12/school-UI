import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor() { }

  checkEmail(email) {
    let newEmail = email.split('@')[0];
   
    return newEmail+'@gmail.com';
  }

}
