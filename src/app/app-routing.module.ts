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

const routes: Routes = [
  { path: '', component: ShellComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'text-templates', component: TextTemplatesComponent },
    { path: 'history', component: HistoryComponent},
    { path: 'edit-message', component: EditMessageComponent },
    { path: 'edit-history', component: ReportComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
