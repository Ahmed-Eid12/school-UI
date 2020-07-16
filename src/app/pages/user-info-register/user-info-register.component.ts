import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CustomService } from 'src/app/services/custom.service';
import { IntegrationService } from 'src/app/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';

@Component({
  selector: 'app-user-info-register',
  templateUrl: './user-info-register.component.html',
  styleUrls: ['./user-info-register.component.css']
})
export class UserInfoRegisterComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private router: Router, 
    private custom: CustomService,
    private integration: IntegrationService,
    private storeData: StoreDataService
  ) {
    // this.addNewPreviousJob();
   }

   // user information form ...
  formGroup = new FormGroup({
    'phone': new FormControl(null, [Validators.required]),
    'userSection': new FormControl(null, [Validators.required]),
    'preDegree': new FormControl(null, []),
    'address': new FormControl(null, [Validators.required]),
    'country': new FormControl(null, [Validators.required]),
    'city': new FormControl(null, [Validators.required]),
    'className': new FormControl(null, [Validators.required]),
    'qualification': new FormControl(null, [Validators.required]),
    'cardId': new FormControl(null, [Validators.required]),
    'experienceYear': new FormControl(null, [Validators.required]),
    /**
     * previous job of array stored 
     * 
     */
    'formPreJobGroup': new FormArray([
    
    ])
  });
  addNewPreviousJob() {
    this.previousJob.push(new FormGroup({
      'preSchoolName': new FormControl(null, [Validators.required]),
      'leaveReason': new FormControl(null, [Validators.required]),
      'year_NO': new FormControl(null, [Validators.required]),
    }))
  }
  // set user image . must be user image
  selectedImage;
  setImage($event) {
    this.selectedImage = $event.target.files[0];
  }

  /**
   *  parentis of student father or mother etc ....
   */
  formParentisGroup = new FormGroup({
    'parentisName': new FormControl(null, [Validators.required]),
    'parentisPhone': new FormControl(null, [Validators.required]),
    'parentisAddress': new FormControl(null, [Validators.required]),
    'stud_parentis': new FormControl(null, [Validators.required])
  });

  removeJob(index) {
    this.previousJob.removeAt(index);
  }

  get previousJob() {
    return this.formGroup.get('formPreJobGroup') as FormArray;
  }

  // get user if he student (id = 7)
  studentToSave;

  // about user if student show parentis section
  studentParentisStatus;
  userSectionSelect(deviceValue) {
    if(deviceValue == 7) {
      this.studentToSave = deviceValue;
      this.studentParentisStatus = true;
    } else {
      this.studentParentisStatus = false;
    }
  }

  sysParentisList;
  userSectionList;
  getGeneratedToken;
  getGeneratedUserId: number;
  getGeneratedUserCode: number;
  ngOnInit(): void {
    this.getGeneratedToken = this.storeData.getStoreElement('_getGeneratedToken');
    this.getGeneratedUserId = +this.storeData.getElementWthoutSecret('_user_ids');
    this.getGeneratedUserCode = +this.storeData.getElementWthoutSecret('_user_code');

    // get user section lookup list
    this.integration.getAllUserSectionList(this.getGeneratedToken).subscribe(sections => {
      this.userSectionList = sections;
    });
    // get sys parentis to list
    this.integration.getAllUserSysParentisList(this.getGeneratedToken).subscribe(sysParentis => {
      this.sysParentisList = sysParentis;
    })
  }

  // registeration about information , previous job and parentis
  saveInformation() {
    this.userService.addNewUserInformation(this.formGroup.value , 
      this.userService.userRegisteredCode , this.formGroup.get('userSection').value ,
       this.selectedImage ,this.getGeneratedToken)
    .subscribe(result => {
      console.log(result);
    })
  }

  saveParentis() {
    this.userService.addNewUserParentis(this.formParentisGroup.value , this.getGeneratedUserCode,
      this.formParentisGroup.get('stud_parentis').value , this.getGeneratedToken)
    .subscribe(result => {
      console.log(result);
    })
  }

  savePreviousJob() {
    this.userService.addNewPreviousJob(this.formGroup.get('formPreJobGroup').value , this.getGeneratedUserId)
    .subscribe(result => {
      console.log(result);
    })
  }

  saveUser($event) {
    $event.preventDefault();
    if(this.studentToSave == 7) {
      this.saveInformation();  
      this.saveParentis();
      this.router.navigate(['/home']);
    } else {
      this.saveInformation();
      this.savePreviousJob();
      this.router.navigate(['/home']);
    }
  }

}
