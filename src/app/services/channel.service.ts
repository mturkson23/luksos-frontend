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

  editChannel(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  deleteChannel(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  getChannels() {

    return this.makePost('/channel/getall', {})
  }

  getChannelsGroup() {

    return this.makePost('/channelgroup/getall', {})
  }

  getTemplateTypes() {

    return this.makePost('/messagetemplatetype/getall', {})
  }

  createChannel(payload: any) {

    return this.makePost('/messagetemplate/add', payload)
  }
}
