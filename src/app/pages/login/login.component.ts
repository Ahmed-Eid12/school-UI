import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/classServices/user';
import { CustomService } from 'src/app/services/custom.service';
import { ASEEncryptDecryptService } from 'src/app/services/security/a-s-e-encrypt-decrypt.service';
import { StoreDataService } from 'src/app/services/storage/store-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router , private custom: CustomService,
    private _encryptDecrypt: ASEEncryptDecryptService,
    private storage: StoreDataService ) {   }

  formGroup = new FormGroup({
    'username': new FormControl(null,[Validators.required , Validators.email]),
    'password': new FormControl(null , [Validators.required])
  });

  ngOnInit(): void {
    
  }
  alertMessage;
  login() {
    if(this.formGroup.valid) {
      this.userService.login(this.formGroup.value).subscribe((result: LoginRequest) => {
        if(result){
          this.userService.status = true;
          this.storage.storeElement('_status' , this.userService.status);

          this.userService.getGeneratedToken = result.token;
          this.storage.storeElement('_getGeneratedToken' , this.userService.getGeneratedToken);

          this.userService.user = result.user;
          this.storage.storeElement('_user' , this.userService.user);

          this.userService.userIsAdmin = result.user.isAdmin;
          this.storage.storeElement('_userIsAdmin' , this.userService.userIsAdmin);

          this.router.navigate(['/profile'] , {
            queryParams: {
              paramCode: result.user.code
            }
          })
          // this.alertMessage = 0;
        }
      },error => {
        console.log(error);
        this.alertMessage = error;
      });
    }
  }

}

interface LoginRequest {
  token: string;
  message: string;
  user: User;
}