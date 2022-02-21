import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert-service.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApplicationService {

  constructor(public override http: HttpClient, protected override router: Router, protected override alertService: AlertService) {
    super(http, alertService, router)
  }

  getUsers() {

    return this.makeGet('/user/getusers')
  }

  getUserGroups() {

    return this.makePost('/usergroup/getall', {})
  }

  getUserGroupTypes() {

    return this.makeGet('/usergroup/getall')
  }
}
