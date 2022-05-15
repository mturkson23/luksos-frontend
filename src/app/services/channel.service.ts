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

  getChannelTypes() {
    return this.makeGet('/channeltype/getall')
  }

  getChannelGroupTypes() {
    return this.makePost('/channelgroup/getall', {})
  }

  getTemplateTypes() {
    return this.makePost('/messagetemplatetype/getall', {})
  }

  getTemplates() {
    return this.makeGet('/messagetemplate/getall')
  }

  createChannel(payload: any) {

    return this.makePost('/messagetemplate/add', payload)
  }

  getChannel(id: any) {
    return this.makePost('/messagetemplate/getbyid', { id })
  }

  addChannelGroup(payload: any) {

    return this.makePost('/channelgroup/add', payload)
  }

  updateChannelGroup(payload: any) {

    return this.makePost('/channelgroup/update', payload)
  }

  getChannelGroupById(id: any) {

    return this.makePost('/channelgroup/getbyid', { id })
  }

  deleteTemplate(id: any) {

    return this.makePost('/messagetemplate/delete', { id })
  }
}
