import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { HomeComponent } from './home/home.component';
import { PollRequestComponent } from './poll-request/poll-request.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'app-user-profile', component: UserProfileComponent }, 
  { path: 'app-login', component: LoginComponent },
  { path: 'app-welcome', component: WelcomeComponent },
  { path: 'app-register', component: RegisterComponent },
  { path: 'app-forget-password', component: ForgetpasswordComponent },
  { path: 'app-reset-password', component: ResetPasswordComponent },
  { path: 'app-home', component: HomeComponent },
  { path: 'app-poll-request', component: PollRequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
