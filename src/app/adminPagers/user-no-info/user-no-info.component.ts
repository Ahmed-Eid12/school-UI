import { Component, OnInit } from '@angular/core';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { AdminIntegrationService } from 'src/app/services/adminServices/AdminIntegrationService';

@Component({
  selector: 'app-user-no-info',
  templateUrl: './user-no-info.component.html',
  styleUrls: ['./user-no-info.component.css']
})
export class UserNoInfoComponent implements OnInit {
  token;
  constructor(private storeData: StoreDataService,
    private adminIntegration: AdminIntegrationService) { }

  ngOnInit(): void {
    this.token = this.storeData.getStoreElement('_getGeneratedToken');
    this.getUsersHaveNoInFormation();
  }
  UserList;
  getUsersHaveNoInFormation() {
    this.adminIntegration.getUsersHaveNoInformation(this.token).subscribe(res => {
      this.UserList = res;
    });
  }

  userName;
  userId;
  userInfo;
  userStatus: boolean = false;
  onClick(e) {
    this.userName = e.target.parentNode.previousSibling.innerHTML;
    this.userInfo = this.UserList.find((user) => {
      if(user.userName == this.userName) {
        this.storeData.storeElementWthoutSecret('_user_code', user.code);
        this.storeData.storeElementWthoutSecret('_user_ids', user.id);
        this.userStatus = true;
      }
    });
}

}
