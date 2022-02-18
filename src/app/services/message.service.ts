import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert-service.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ApplicationService {

  constructor(public override http: HttpClient, protected override router: Router, protected override alertService: AlertService) {
    super(http, alertService, router)
  }

  createMessage(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  updateMessage(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  deleteMessage(payload: any) {

    return this.makePost('/customers/mobile/approve', payload)
  }

  getMessages() {

    return this.makeGet('/messagetemplate/getall')
  }
}
