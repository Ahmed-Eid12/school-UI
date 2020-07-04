import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CustomService } from 'src/app/services/custom.service';
import { IntegrationService } from 'src/app/services/serviceIntegration/integration.service';

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
    private integration: IntegrationService
  ) { }

  formGroup = new FormGroup({
    'phone': new FormControl(null, [Validators.required]),
    'userSection': new FormControl(null, [Validators.required]),
    'preDegree': new FormControl(null, [Validators.required]),
    'address': new FormControl(null, [Validators.required]),
    'country': new FormControl(null, [Validators.required]),
    'city': new FormControl(null, [Validators.required]),
    'className': new FormControl(null, [Validators.required]),
    'qualification': new FormControl(null, [Validators.required]),
    'cardId': new FormControl(null, [Validators.required]),
    'experienceYear': new FormControl(null, [Validators.required]),
  });

  formParentisGroup = new FormGroup({
    'parentisName': new FormControl(null, [Validators.required]),
    'parentisPhone': new FormControl(null, [Validators.required]),
    'parentisAddress': new FormControl(null, [Validators.required]),
  });

  formPreJobGroup = new FormGroup({
    'schoolName': new FormControl(null, [Validators.required]),
    'leaveReason': new FormControl(null, [Validators.required]),
    'yearNO': new FormControl(null, [Validators.required]),
  });

  userSectionList;
  ngOnInit(): void {
    // get user section lookup list
    // this.integration.getAllUserSectionList(this.userService.getGeneratedToken).subscribe(sections => {
    //   this.userSectionList = sections;
    // });
  }

}
