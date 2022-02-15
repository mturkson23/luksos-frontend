import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert-service.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends ApplicationService {

  constructor(public override http: HttpClient, protected override router: Router, protected override alertService: AlertService) {
    super(http, alertService, router)
  }

  createChannel(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  editChannel(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  deleteChannel(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  getChannels(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }
}
