import { Component, OnInit } from '@angular/core';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { AdminIntegrationService } from 'src/app/services/adminServices/AdminIntegrationService';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  token;
  constructor(private storeData: StoreDataService,
    private adminIntegration: AdminIntegrationService) { }
  userIsAdmin; 
  ngOnInit(): void {
    this.token = this.storeData.getStoreElement('_getGeneratedToken');
    this.userIsAdmin = this.storeData.getStoreElement('_userIsAdmin');
    this.getCountUsersHaveNoInforamtion();
  }

  UsersCount;
  getCountUsersHaveNoInforamtion() {
    this.adminIntegration.getCountUsersHaveNoInformation(this.token).subscribe(res => {
      this.UsersCount = res;
    })
  }

}
