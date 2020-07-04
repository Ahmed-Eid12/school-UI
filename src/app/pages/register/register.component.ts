import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CustomService } from 'src/app/services/custom.service';
import { IntegrationService } from 'src/app/services/serviceIntegration/integration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private router: Router, 
    private custom: CustomService,
    private integration: IntegrationService
    ) { 
    console.log(this.userService.status);
    console.log(this.userService.getGeneratedToken);
    console.log(this.userService.user);
    this.userService.loggedIn.subscribe(res => {
      console.log('fron register : '+res)
    })
  }

  formGroup = new FormGroup({
    'username': new FormControl(null,[Validators.required ]),
    'email': new FormControl(null,[Validators.required ]),
    'password': new FormControl(null, [Validators.required]),
    'cpassword': new FormControl(null, [Validators.required]),
    
  });

  sysParentisList;
  studentParentisStatus = false;
  ngOnInit(): void {
    // get sys parentis to list
    // this.integration.getAllUserSysParentisList(this.userService.getGeneratedToken).subscribe(sysParentis => {
    //   this.sysParentisList = sysParentis;
    // })
  }

  register() {
    if(this.formGroup.valid && this.formGroup.value && (this.formGroup.get('password').value === this.formGroup.get('cpassword').value)) {
      //generate email end with '@gmail.com'
      let email: string = this.formGroup.get('email').value;
      this.formGroup.get('email').setValue(this.custom.checkEmail(email));

      this.userService.register(this.formGroup.value).subscribe(result => {
        console.log(result);
        this.router.navigate(['/userinforegister']);
        
      }, error => {
        console.log(error);
      })
    } else {
      alert('please, fill all fields ... ');
    }
    
  }

  // // about user if student show parentis section
  // parentisSection(deviceValue) {
  //   if(deviceValue == 7) {
  //     this.studentParentisStatus = true;
  //   } else {
  //     this.studentParentisStatus = false;
  //   }
  // }

}
