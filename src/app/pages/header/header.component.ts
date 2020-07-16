import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sora',{static: true}) sora: ElementRef;
  @ViewChild('userName',{static: true}) userName: ElementRef;
  @ViewChild('profile',{static: true}) profile: ElementRef;
  constructor(private userService: UserService,
    private storeData: StoreDataService,
    private router: Router) { }

  userLoginStatus = this.storeData.getStoreElement('_status');
  userLogin = this.storeData.getStoreElement('_user');
  userIsAdmin = this.storeData.getStoreElement('_userIsAdmin');

  apperDropDown: boolean = false;
  userStatus = false;
  ngOnInit(): void {
    if(this.userLogin) {
      console.log(this.userLogin);
      this.sora.nativeElement.src = 'assets/serverUsersImage/'+this.userLogin.userInformation.image;
      this.userName.nativeElement.innerHTML = this.userLogin.userName;
      this.userStatus = true;
    } else {
      this.userStatus = false;
    }
  }

  apperProfile() {
    if(this.userLogin) {
      this.profile.nativeElement.style.opacity = 1;
      this.apperDropDown = !this.apperDropDown;
    } else {
      this.profile.nativeElement.style.opacity = 0;
    }
  }

  logout() {
    this.userService.status = false;
    this.storeData.deleteStorageElement('_status');
    this.userService.getGeneratedToken = null;
    this.storeData.deleteStorageElement('_getGeneratedToken');
    this.userService.user = null;
    this.storeData.deleteStorageElement('_user');
    this.userService.userIsAdmin = 0;
    this.storeData.deleteStorageElement('_userIsAdmin');
    this.router.navigate(['/login']);
  }

}
