import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert-service.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class FaultService extends ApplicationService {

  constructor(public override http: HttpClient, protected override router: Router, protected override alertService: AlertService) {
    super(http, alertService, router)
  }

  createFault(payload: any) {

    return this.makePost('/fault/add', payload)
  }

  getFaults() {

    return this.makePost('/fault/getall', {})
  }

  getFaultsByState(state: string) {

    return this.makePost('/fault/getallbystate', { state })
  }

  getFault(id: any) {

    return this.makePost('/fault/getbyId', { id })
  }
}
