import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CustomService } from 'src/app/services/custom.service';
import { IntegrationService } from 'src/app/services/serviceIntegration/integration.service';
import { User } from 'src/app/classServices/user';
import { StoreDataService } from 'src/app/services/storage/store-data.service';

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
    private integration: IntegrationService,
    private storeData: StoreDataService
    ) { 
  }

  formGroup = new FormGroup({
    'username': new FormControl(null,[Validators.required ]),
    'email': new FormControl(null,[Validators.required ]),
    'password': new FormControl(null, [Validators.required]),
    'cpassword': new FormControl(null, [Validators.required]),
    
  });

  studentParentisStatus = false;
  ngOnInit(): void {
    
  }

  register() {
    if(this.formGroup.valid && this.formGroup.value && (this.formGroup.get('password').value === this.formGroup.get('cpassword').value)) {
      //generate email end with '@gmail.com'
      let email: string = this.formGroup.get('email').value;
      this.formGroup.get('email').setValue(this.custom.checkEmail(email));

      this.userService.register(this.formGroup.value).subscribe((result: User) => {
        this.userService.userRegisteredCode = result.code;
        this.storeData.storeElementWthoutSecret('_user_code', this.userService.userRegisteredCode);

        this.userService.userRegisteredId = result.id;
        this.storeData.storeElementWthoutSecret('_user_ids', this.userService.userRegisteredId);

        this.router.navigate(['/userinforegister']);
        
      }, error => {
        console.log(error);
      })
    } else {
      alert('please, fill all fields ... ');
    }
    
  }

}
