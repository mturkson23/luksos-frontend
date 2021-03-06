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

  closeFault(id: any) {
    console.log('here too', id)
    return this.makePost('/fault/close', { id: parseInt(id) })
  }

  closeFaultWithData(postData: any) {
    console.log('here too', postData)
    return this.makePost('/fault/close', postData)
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

  getResolutionByFaultId(id: any) {
    return this.makePost('/faultresolution/getById', { id })
  }

  getLogsByFaultId(id: any) {
    return this.makePost('/fault/getfaultlogs', { id })
  }

  updateFault(payload: any) {
    console.log(payload)
    return this.makePost('/fault/update', payload)
  }

  sendMessages(payload: any) {
    console.log(payload)
    return this.makePost('/fault/sendemailsms', payload)
  }

  updateLog(payload: any) {
    return this.makePost('/faultresolution/updateremarkbyid', payload)
  }

  updateFailureDetails(payload: any) {
    return this.makePost('/faultresolution/update-fault-details', payload)
  }  

  getHistoryByState(state: string) {
    return this.makePost('/fault/gethistorybystate', { state })
  }

  getHistoryWithParams(state: string) {
    return this.makePost('/fault/getfaultbytpyeanddatereport', state)
    // return this.makeDownload('/fault/faults-report', state)
  }

  getFaultTypes() {
    return this.makePost('/fault/getfaulttypes', {  })
  }
}
