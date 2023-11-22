import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component'
import { ResetPasswordComponent } from './resetpassword/resetpassword.component'
import { HomeComponent } from './home/home.component'
import { PollRequestComponent } from './poll-request/poll-request.component'
import { OthersProfileComponent } from './others-profile/others-profile.component'
import { PollViewComponent } from './poll-view/poll-view.component'
import { AuthGuard } from './authorize.guard'
import { ModeratorRequestsComponent } from './moderator-requests/moderator-requests.component'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'app-moderator-requests', component: ModeratorRequestsComponent },
  {
    path: 'app-user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-welcome', component: WelcomeComponent },
  { path: 'app-register', component: RegisterComponent },
  { path: 'app-forget-password', component: ForgetpasswordComponent },
  { path: 'app-reset-password', component: ResetPasswordComponent },
  { path: 'app-home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'app-poll-request',
    component: PollRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-profile/:username',
    component: OthersProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-poll-view/:pollId',
    component: PollViewComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
