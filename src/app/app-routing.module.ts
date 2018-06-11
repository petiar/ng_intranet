import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {AuthGuardService} from "./services/auth-guard.service";
import {ChatComponent} from "./chat/chat.component";
import {TimesheetComponent} from "./timesheet/timesheet.component";
import {ProfileComponent} from './profile/profile.component';
import {OAuthGuardService} from './services/oauth-guard.service';
import {TimesheetAddComponent} from './timesheet/timesheet-add/timesheet-add.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardService] },
  { path: 'timesheet', component: TimesheetComponent, canActivate: [OAuthGuardService], children: [
          { path: 'add', component: TimesheetAddComponent }
      ]},
  { path: 'timesheet-add', component: TimesheetAddComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [OAuthGuardService]},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
