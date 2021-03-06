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
  getWorkPeriods() {
    return this.makePost('/monthlyworkperiodconfig/getall', {})
  }
  getServiceHours() {
    return this.makePost('/websystemmonthconfig/getall', {})
  }

  getRelatedServiceById(id: any) {
    return this.makePost('/websystem/getbyid', { id })
  }
  getWorkPeriodById(id: any) {
    return this.makePost('/monthlyworkperiodconfig/getbyid', { id })
  }
  getServiceHoursById(id: any) {
    return this.makePost('/websystemmonthconfig/getbyid', { id })
  }

  addWebSystemConfig(payload: any) {
    return this.makePost('/websystem/add', payload)
  }
  addWorkPeriodConfig(payload: any) {
    return this.makePost('/monthlyworkperiodconfig/add', payload)
  }
  addServiceHours(payload: any) {
    return this.makePost('/websystemmonthconfig/add', payload)
  }

  editWebSystemConfig(payload: any) {
    return this.makePost('/websystem/update', payload)
  }
  editWorkPeriodConfig(payload: any) {
    return this.makePost('/monthlyworkperiodconfig/update', payload)
  }
  editServiceHours(payload: any) {
    return this.makePost('/websystemmonthconfig/update', payload)
  }

  deleteWebSystem(id: any) {
    return this.makePost('/websystem/delete', { id })
  }
  deleteWorkPeriod(id: any) {
    return this.makePost('/monthlyworkperiodconfig/delete', { id })
  }
  deleteServiceHours(id: any) {
    return this.makePost('/websystemmonthconfig/delete', { id })
  }
}
