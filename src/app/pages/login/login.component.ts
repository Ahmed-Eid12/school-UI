import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router , private custom: CustomService) { 
  }

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
          // this.userService.changeTokenStatus(result.token);
          // sessionStorage.setItem('token',result.token);
          // this.userService.changeLoggedInStatus(result);
          console.log(result)
          this.userService.status = true;
          this.userService.getGeneratedToken = result.token;
          this.userService.user = result.user;
          this.userService.userIsAdmin = result.user.isAdmin;
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