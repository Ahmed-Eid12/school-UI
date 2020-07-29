import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  constructor() {}

  checkEmail(email) {
    let newEmail = email.split('@')[0];

    return newEmail + '@gmail.com';
  }

  _success = new Subject<string>();
  _type = new Subject<string>();
  _face = new Subject<string>();

  changeSuccessMessage(message, type, face) {
    this._success.next(message);
    this._type.next(type);
    this._face.next(face);
  }

  resetComponentElement(formGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.get(key).reset();
    });
  }
}
