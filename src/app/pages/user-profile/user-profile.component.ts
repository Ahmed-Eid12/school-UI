import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userLogin;
  constructor(private userService: UserService,
    private storeData: StoreDataService) { }

  ngOnInit(): void {
    this.userLogin = this.storeData.getStoreElement('_user');
  }
}
