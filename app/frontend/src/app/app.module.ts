import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SideBarComponent } from './side-bar/side-bar.component'
import { RanksBarComponent } from './ranks-bar/ranks-bar.component'
import { BadgesBarComponent } from './badges-bar/badges-bar.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthService } from './auth.service'
import { HttpClientModule } from '@angular/common/http'
import { WelcomeComponent } from './welcome/welcome.component'
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component'
import { ResetPasswordComponent } from './resetpassword/resetpassword.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { TagsBarComponent } from './tags-bar/tags-bar.component'
import { LeaderboardBarComponent } from './leaderboard-bar/leaderboard-bar.component'
import { PollRequestComponent } from './poll-request/poll-request.component'
import { PollComponent } from './poll/poll.component'
import { OthersProfileComponent } from './others-profile/others-profile.component'
import { PollViewComponent } from './poll-view/poll-view.component'
import { HeaderComponent } from './header/header.component'
import { ModeratorRequestsComponent } from './moderator-requests/moderator-requests.component'
import { ModeratorSideBarComponent } from './moderator-side-bar/moderator-side-bar.component'
import { TagPageComponent } from './tag-page/tag-page.component'
import { ModeratorLoginComponent } from './moderator-login/moderator-login.component'
import { ModeratorHeaderComponent } from './moderator-header/moderator-header.component'
import { VerificationComponent } from './verification/verification.component'
import { FaqSectionComponent } from './faq-section/faq-section.component'
import { VerifyComponent } from './verify/verify.component'
import { ConfirmModelComponent } from './confirm-model/confirm-model.component'
import { MatDialogModule } from '@angular/material/dialog'
import { UserSettleRequestComponent } from './user-settle-request/user-settle-request.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component'
import { SettledPollComponent } from './settled-poll/settled-poll.component'
import { ModeratorPollReviewComponent } from './moderator-poll-review/moderator-poll-review.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { ReportRequestsComponent } from './report-requests/report-requests.component';
import { ModeratorApplyComponent } from './moderator-apply/moderator-apply.component';
import { ScrollToTopButtonComponent } from './scroll-to-top-button/scroll-to-top-button.component';
import { UserPendingRequestsComponent } from './user-pending-requests/user-pending-requests.component'
import { FollowListComponent } from './follow-list/follow-list.component'
import { MatInputModule } from '@angular/material/input';
import { QtextAnnotationComponent } from './qtext-annotation/qtext-annotation.component';
import { NgxAnnotateTextModule } from "ngx-annotate-text";
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    RanksBarComponent,
    BadgesBarComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    TagsBarComponent,
    LeaderboardBarComponent,
    PollRequestComponent,
    PollComponent,
    OthersProfileComponent,
    PollViewComponent,
    HeaderComponent,
    ModeratorRequestsComponent,
    ModeratorSideBarComponent,
    TagPageComponent,
    ModeratorLoginComponent,
    ModeratorHeaderComponent,
    VerificationComponent,
    FaqSectionComponent,
    VerifyComponent,
    ConfirmModelComponent,
    UserSettleRequestComponent,
    ChangePasswordComponent,
    SettingsComponent,
    SettledPollComponent,
    ModeratorPollReviewComponent,
    FileUploadComponent,
    ReportUserComponent,
    ReportRequestsComponent,
    ModeratorApplyComponent,
    ScrollToTopButtonComponent,
    UserPendingRequestsComponent,
    FollowListComponent,
    QtextAnnotationComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    NgxAnnotateTextModule,
    NgxAnnotateTextModule,
    MatTooltipModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
