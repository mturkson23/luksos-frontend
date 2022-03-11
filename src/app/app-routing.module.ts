import { ReportComponent } from './pages/report/report.component';
import { HistoryComponent } from './pages/history/history.component';
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

const routes: Routes = [
  { path: '', component: ShellComponent,canActivateChild: [ DashboardGuard ], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'text-templates', component: TextTemplatesComponent },
    { path: 'history', component: HistoryComponent},
    { path: 'edit-message/:id', component: EditMessageComponent },
    { path: 'edit-history/:id', component: ReportComponent },
    { path: 'channels', component: ChannelsComponent },
    { path: 'users', component: UsersComponent },
  ]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'dashboard' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
