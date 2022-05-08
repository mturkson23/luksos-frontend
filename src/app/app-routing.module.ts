// import { AddChannelGroupComponent } from './pages/channels/add-channel-group/add-channel-group.component';
import { ChannelTypesComponent } from './pages/settings/channel-types/channel-types.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserGroupsComponent } from './pages/users/user-groups/user-groups.component';
import { TextTemplatesListComponent } from './pages/settings/text-templates-list/text-templates-list.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ReportComponent } from './pages/report/report.component';
import { HistoryComponent } from './pages/history/history.component';
import { BerichtComponent } from './pages/bericht/bericht.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShellComponent } from './pages/shell/shell.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { TextTemplatesComponent } from './pages/text-templates/text-templates.component';
import { EditMessageComponent } from './pages/edit-message/edit-message.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { SettingsGuard } from './guards/settings.guard';
import { TextTemplatesGroupsComponent } from './pages/settings/text-templates-groups/text-templates-groups.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { AddChannelTypeComponent } from './pages/settings/channel-types/add-channel-type/add-channel-type.component';
import { EditChannelTypeComponent } from './pages/settings/channel-types/edit-channel-type/edit-channel-type.component';
import { ReportsComponent } from './pages/settings/reports/reports.component';

const routes: Routes = [
  { path: '', component: ShellComponent, canActivateChild: [ DashboardGuard ], children: [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'text-templates', component: TextTemplatesComponent },
    { path: 'history', component: HistoryComponent},
    { path: 'bericht', component: BerichtComponent},
    { path: 'edit-message/:id', component: EditMessageComponent },
    { path: 'edit-history/:id', component: ReportComponent },
    { path: 'channels', component: ChannelsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: UsersComponent }
  ]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivateChild: [ SettingsGuard ], children: [
    { path: 'channel-groups', component: ChannelTypesComponent },
    { path: 'add-channel-group', component: AddChannelTypeComponent },
    { path: 'edit-channel-group/:id', component: EditChannelTypeComponent },
    { path: 'text-templates', component: TextTemplatesListComponent },
    { path: 'text-templates-groups', component: TextTemplatesGroupsComponent },
    { path: 'user-management', component: UsersComponent },
    { path: 'user-groups', component: UserGroupsComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
    { path: 'reports', component: ReportsComponent },
    { path: '**', redirectTo: 'text-templates' }
  ] },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
