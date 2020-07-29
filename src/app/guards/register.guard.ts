import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { StoreDataService } from '../services/storage/store-data.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(private userService: UserService,
    private storeData: StoreDataService){}
  userIsAdmin = this.storeData.getStoreElement('_userIsAdmin');
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.userIsAdmin !== 0 && this.userIsAdmin) {
      return true;
    }
  }
  
}
