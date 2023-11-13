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
import { ResetPasswordService } from './resetpassword.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { TagsBarComponent } from './tags-bar/tags-bar.component'
import { LeaderboardBarComponent } from './leaderboard-bar/leaderboard-bar.component'
import { PollRequestComponent } from './poll-request/poll-request.component'
import { PollComponent } from './poll/poll.component'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, ResetPasswordService],
  bootstrap: [AppComponent],
})
export class AppModule {}
