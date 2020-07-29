import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './guards/home.guard';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { RegisterGuard } from './guards/register.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserGuard } from './guards/userGuard/user.guard';
import { UserInfoRegisterComponent } from './pages/user-info-register/user-info-register.component';
import { UserNoInfoComponent } from './adminPagers/user-no-info/user-no-info.component';
import { UserSectionComponent } from './adminPagers/user-section/user-section.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RegisterGuard]
      },
      {
        path: 'userinforegister',
        component: UserInfoRegisterComponent
      }
    ]
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'userInAdmin',
        component: UserNoInfoComponent
      },
      {
        path: 'userSection',
        component: UserSectionComponent
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    // canActivate: [UserGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
