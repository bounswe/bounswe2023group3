import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'app-user-profile', component: UserProfileComponent }, //may be deleted later, just for test viewing
  { path: 'app-login', component: LoginComponent },
  { path: 'app-welcome', component: WelcomeComponent },
  { path: 'app-register', component: RegisterComponent },
  { path: 'app-forget-password', component: ForgetpasswordComponent },
  { path: 'app-reset-password', component: ResetPasswordComponent },
  { path: 'app-home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
