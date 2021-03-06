import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { ShellComponent } from './pages/shell/shell.component';
import { PanelComponent } from './components/panel/panel.component';
import { CustomDatePipe } from './components/utils/custom.datepipe';
import { CustomTimePipe } from './components/utils/custom.timepipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { TextTemplatesComponent } from './pages/text-templates/text-templates.component';
import { HistoryComponent } from './pages/history/history.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReportComponent } from './pages/report/report.component';
import { BerichtComponent } from './pages/bericht/bericht.component';
import { EditMessageComponent } from './pages/edit-message/edit-message.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ToastrModule } from 'ngx-toastr';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { AddChannelComponent } from './pages/channels/add-channel/add-channel.component';
import { EditChannelComponent } from './pages/channels/edit-channel/edit-channel.component';
import { AddChannelGroupComponent } from './pages/channels/add-channel-group/add-channel-group.component';
import { EditChannelGroupComponent } from './pages/channels/edit-channel-group/edit-channel-group.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsSidebarComponent } from './components/settings-sidebar/settings-sidebar.component';
import { TextTemplatesListComponent } from './pages/settings/text-templates-list/text-templates-list.component';
import { TextTemplatesGroupsComponent } from './pages/settings/text-templates-groups/text-templates-groups.component';
import { UserGroupsComponent } from './pages/users/user-groups/user-groups.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { ChannelTypesComponent } from './pages/settings/channel-types/channel-types.component';
import { WebSystemConfigsComponent } from './pages/settings/web-system-configs/web-system-configs.component';
import { AddWebSystemConfigsComponent } from './pages/settings/web-system-configs/add/add-web-system-config.component';
import { EditWebSystemConfigsComponent } from './pages/settings/web-system-configs/edit/edit-web-system-config.component';

import { WorkPeriodConfigComponent } from './pages/settings/work-period-configs/work-period-configs.component';
import { AddWorkPeriodConfigComponent } from './pages/settings/work-period-configs/add/add-work-period-config.component';
import { EditWorkPeriodConfigComponent } from './pages/settings/work-period-configs/edit/edit-work-period-config.component';

import { ServiceHoursComponent } from './pages/settings/service-hours/service-hours.component';
import { AddServiceHoursComponent } from './pages/settings/service-hours/add/add-service-hours.component';
import { EditServiceHoursComponent } from './pages/settings/service-hours/edit/edit-service-hours.component';

import { AddChannelTypeComponent } from './pages/settings/channel-types/add-channel-type/add-channel-type.component';
import { EditChannelTypeComponent } from './pages/settings/channel-types/edit-channel-type/edit-channel-type.component';
import { ReportsComponent } from './pages/settings/reports/reports.component';
import { ChannelsSetupComponent } from './pages/settings/channels-setup/channels-setup.component';

import { AddChannelsSetupComponent } from './pages/settings/channels-setup/add-channels-setup/add-channels-setup.component';
import { EditChannelsSetupComponent } from './pages/settings/channels-setup/edit-channels-setup/edit-channels-setup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ShellComponent,
    PanelComponent,
    AnnouncementsComponent,
    TextTemplatesComponent,
    HistoryComponent,
    ReportComponent,
    BerichtComponent,
    EditMessageComponent,
    ModalComponent,
    UsersComponent,
    ChannelsComponent,
    CustomDatePipe,
    AddUserComponent,
    EditUserComponent,
    AddChannelComponent,
    EditChannelComponent,
    AddChannelGroupComponent,
    EditChannelGroupComponent,
    CustomTimePipe,
    SettingsComponent,
    SettingsSidebarComponent,
    TextTemplatesListComponent,
    TextTemplatesGroupsComponent,
    UserGroupsComponent,
    ProfileComponent,
    ChannelTypesComponent,
    AddChannelTypeComponent,
    EditChannelTypeComponent,
    WebSystemConfigsComponent,
    AddWebSystemConfigsComponent,
    EditWebSystemConfigsComponent,
    WorkPeriodConfigComponent,
    AddWorkPeriodConfigComponent,
    EditWorkPeriodConfigComponent,
    ServiceHoursComponent,
    AddServiceHoursComponent,
    EditServiceHoursComponent,
    ReportsComponent,
    ChannelsSetupComponent,
    AddChannelsSetupComponent,
    EditChannelsSetupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      closeButton: true,
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    NgbModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
