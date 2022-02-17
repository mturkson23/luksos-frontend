import { ApplicationService } from './application.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert-service.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { Appsettings } from '../models/Appsettings.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApplicationService {

  constructor(public override http: HttpClient, protected override router: Router, protected override alertService: AlertService) {
    super(http, alertService, router)
  }

  public preauthenticate() {

    return new Promise((res, rej) => {

      return this.http.get<Appsettings>('assets/appsettings.json').toPromise().then((settings: any) => {
        this.saveServerUrl(settings.serverUrl)
        ApplicationService.Appsettings = settings as Appsettings;
        res(settings)
      })
    })
  }

  public authenticate(Username: string, Password: string, settings: Appsettings) {

    return this.http.post<User>(`${settings.serverUrl}/user/login`, {
      email_address: Username,
      password: Password
    })
  }

  public saveTokens(Token: string, RefreshToken: string, User: User) {

    localStorage.setItem('AUTH_TOKEN', Token);
    localStorage.setItem('AUTH_REFRESH_TOKEN', RefreshToken);
    localStorage.setItem('AUTH_USER_ID', User.username);

    // if(User.IsSuper == 'YES') {
    //   localStorage.setItem('AUTH_USER_ROLE', 'SUPER');
    // } else {
    //   localStorage.setItem('AUTH_USER_ROLE', User.Role);
    // }

    localStorage.setItem('User', JSON.stringify(User));

    return Promise.resolve();
  }

  public logOut() {

    return this.http.post<User>(`${this.connectionString}/users/logout`, {}, this.httpOptions)
  }

  public saveServerUrl(serverUrl: string) {
    localStorage.setItem('SERVER_URL', serverUrl)
  }

  public isAuthenticated(): boolean {

    return localStorage.getItem('AUTH_TOKEN') != null
  }

  public currentUser(): User {

    return localStorage.getItem('User') != null || '' ? JSON.parse(localStorage.getItem('User') as any) : null
  }


  public navigateToLogin() {
    return this.router.navigateByUrl('/authentication/login');
  }

  public navigateToHome() {
    return this.router.navigateByUrl('/');
  }

  public getUsers() {

    return this.makeGet('/users/get')
  }
}
