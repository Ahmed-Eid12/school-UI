import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { StoreDataService } from 'src/app/services/storage/store-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // users;
  // userAdminStatus;
  constructor(private userService: UserService,
    private router: Router,
    private storeData: StoreDataService) { 
  }
  userStatus;
  // existingUser = this.userService.user;
  ngOnInit(): void {
    // this.userAdminStatus = this.userService.userIsAdmin;
    this.userStatus = this.storeData.getStoreElement('_status');
    // console.log(this.userService.getGeneratedToken);
    // console.log(this.userService.user);
    // console.log(this.userService.userIsAdmin);
      // this.userService.getAll(this.userService.getGeneratedToken).subscribe( result => {
      //   console.log(result);
      // });
    //   //getAllUserByCheckAdmin
    //   this.userService.getAllUserByCheckAdmin(this.userService.getGeneratedToken).subscribe( result => {
    //     this.users = result;
    //   });
  }
}
