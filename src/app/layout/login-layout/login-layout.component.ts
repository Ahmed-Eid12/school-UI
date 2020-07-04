import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    
  }
  userIsAdmin = this.userService.userIsAdmin;
}
