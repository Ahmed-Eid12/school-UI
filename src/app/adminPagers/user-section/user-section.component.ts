import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { AdminIntegrationService } from 'src/app/services/adminServices/AdminIntegrationService';
import { StoreDataService } from 'src/app/services/storage/store-data.service';
import { UserSection } from 'src/app/classServices/userSection/user-section';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css']
})
export class UserSectionComponent implements OnInit {

  formGroup = new FormGroup( {
    'sction': new FormControl('',[Validators.required])
  })
  constructor( private adminIntegration: AdminIntegrationService,
    private storeData: StoreDataService,
    private customService: CustomService) {
  }

  token;
  $userSections;
  ngOnInit(): void {
    this.token = this.storeData.getStoreElement('_getGeneratedToken');
    this.getAllUsersSection();
  }

  // get all users section
  getAllUsersSection() {
    this.adminIntegration.getAllUsersSection(this.token).subscribe((usersSection: UserSection) => {
      this.$userSections = usersSection;
    })
  }

  // save new user section
  saveNewUserSection() {
    let section = this.formGroup.get('sction').value.trim();
    let userSectionStatus = this.$userSections.find(userSection => {
      return (userSection.sction === section);
    });

    if(!userSectionStatus) {
     if(this.formGroup.valid) {
        this.adminIntegration.saveNewUsersSection(this.token,this.formGroup.value).subscribe(userSection => {
          if(userSection) {
            this.customService.changeSuccessMessage('user section saved successfully ...', 'success', 'SUCCESS!');
            this.getAllUsersSection();
          }
        })
      } else {
        this.customService.changeSuccessMessage('please insert any user section first ...', 'warning', 'WARNING!');  
      }
    } else {
      this.customService.changeSuccessMessage('duplicate user section please, try again ...', 'warning', 'WARNING!');
    }
  }

  // reset inputs items to null or ''
  resetItems() {
    this.customService.resetComponentElement(this.formGroup);
  }
}
