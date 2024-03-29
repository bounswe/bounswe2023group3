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
import { TagPageComponent } from './tag-page/tag-page.component'
import { ModeratorLoginComponent } from './moderator-login/moderator-login.component'
import { ModeratorAuthGuard } from './moderator-authorize.guard'
import { VerificationComponent } from './verification/verification.component'
import { ModeratorPollReviewComponent } from './moderator-poll-review/moderator-poll-review.component'
import { VerifyComponent } from './verify/verify.component'
import { SettingsComponent } from './settings/settings.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { SettledPollComponent } from './settled-poll/settled-poll.component'
import { ReportRequestsComponent } from './report-requests/report-requests.component'
import { ModeratorApplyComponent } from './moderator-apply/moderator-apply.component'
import { UserPendingRequestsComponent } from './user-pending-requests/user-pending-requests.component'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'app-moderator-login', component: ModeratorLoginComponent },
  { path: 'app-moderator-apply', component: ModeratorApplyComponent },
  { path: 'app-verify', component: VerifyComponent },
  { path: 'app-change-password', component: ChangePasswordComponent },
  { path: 'app-settled-poll', component: SettledPollComponent },
  { path: 'app-pending-requests', component: UserPendingRequestsComponent },
  {
    path: 'app-moderator-requests',
    component: ModeratorRequestsComponent,
    canActivate: [ModeratorAuthGuard],
  },
  {
    path: 'app-report-requests',
    component: ReportRequestsComponent,
    canActivate: [ModeratorAuthGuard],
  },
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
  { path: 'app-home', component: HomeComponent },
  {
    path: 'app-poll-request',
    component: PollRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-profile/:username',
    component: OthersProfileComponent,
  },
  {
    path: 'app-poll-view/:pollId',
    component: PollViewComponent,
  },
  {
    path: 'app-tag-page/:tagName/:tagId',
    component: TagPageComponent,
  },
  {
    path: 'app-verification',
    component: VerificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-moderator-poll-review/:pollId',
    component: ModeratorPollReviewComponent,
    canActivate: [ModeratorAuthGuard],
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
