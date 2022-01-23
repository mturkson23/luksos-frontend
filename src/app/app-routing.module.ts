import { SignupComponent } from './pages/signup/signup.component';
import { ShellComponent } from './pages/shell/shell.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { TextTemplatesComponent } from './pages/text-templates/text-templates.component';

const routes: Routes = [
  { path: '', component: ShellComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'announcements', component: AnnouncementsComponent },
    { path: 'text-templates', component: TextTemplatesComponent },
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
