import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

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
import { ModeratorSideBarComponent } from './moderator-side-bar/moderator-side-bar.component';
import { TagPageComponent } from './tag-page/tag-page.component';
import { ModeratorLoginComponent } from './moderator-login/moderator-login.component';
import { ModeratorHeaderComponent } from './moderator-header/moderator-header.component';
import { VerificationComponent } from './verification/verification.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { VerifyComponent } from './verify/verify.component'

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
    VerificationComponent
    FaqSectionComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
