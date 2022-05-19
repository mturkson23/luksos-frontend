import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert-service.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends ApplicationService {

  constructor(public override http: HttpClient, protected override router: Router, protected override alertService: AlertService) {
    super(http, alertService, router)
  }

  getRelatedServices() {
    return this.makePost('/websystem/getall', {})
  }
}
