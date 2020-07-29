import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserInfoRegisterComponent } from './pages/user-info-register/user-info-register.component';
import { SliderComponent } from './pages/slider/slider.component';
import { UserNoInfoComponent } from './adminPagers/user-no-info/user-no-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { UserSectionComponent } from './adminPagers/user-section/user-section.component';
import { UserParentisComponent } from './adminPagers/user-parentis/user-parentis.component';
import { PageStatusComponent } from './utils/page-status/page-status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    DefaultLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    UserProfileComponent,
    UserInfoRegisterComponent,
    SliderComponent,
    UserNoInfoComponent,
    UserSectionComponent,
    UserParentisComponent,
    PageStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
