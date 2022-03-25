import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaultService } from 'src/app/services/fault.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CHANNEL_TYPE } from '../edit-message/type';
import { ChannelService } from 'src/app/services/channel.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  channelDropdownList: any = [];
  channelSelectedItems: Array<CHANNEL_TYPE> = [];
  channelDropdownSettings: any = {};
  channelTypeDropdownSettings: any = {};

  groupDropdownList: any = [];
  groupSelectedItems: any = [];
  groupDropdownSettings: any = {};

  id: any
  faultData: any = {}
  pageTitle: string=''
  reportedBy: string=''
  resolvedBy: string=''

  logs: any = []

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private faultService: FaultService,
    private activatedRoute: ActivatedRoute,
    private channelService: ChannelService,
    private alertService: AlertService
  ) {}

  public form: FormGroup = new FormGroup({});

  toHoursAndMinutes(totalMinutes: number) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${this.padTo2Digits(hours)} : ${this.padTo2Digits(minutes)}`;
  }

  padTo2Digits(num: number) {
    return this.formatNumberSeparators(num.toString().padStart(2, '0'));
  }

  formatNumberSeparators(x: string){
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  ngOnInit(): void {
    this.channelSelectedItems = [];

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      reported_date: new FormControl('', []),
      closed_date: new FormControl('', []),
      ticket_number: new FormControl('', []),
      message: new FormControl('', []),
      resolution_remark: new FormControl('', []),
      expected_duration: new FormControl('', []),
      actual_duration: new FormControl('', []),
      logs: new FormControl(0, []),
      channelType: new FormControl('', []),
      channelGroup: new FormControl('', []),
    });

    this.form.disable()

    const remark = this.form.get('resolution_remark')
    const ticket_number = this.form.get('ticket_number')

    if(remark || ticket_number) {
      remark?.enable()
      ticket_number?.enable()
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    this.channelDropdownList = []

    this.channelSelectedItems = [];

    this.groupDropdownList = [];

    this.groupSelectedItems = [];

    this.channelDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'identifier',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.channelTypeDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.groupDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.faultService.getResolutionByFaultId(parseInt(this.id)).subscribe((data: any) => {
      console.log('Log::fault data::',data);
      this.faultData = data.extra;

      this.pageTitle = `Meldung ${this.id} "${this.faultData.title}" ${formatDate(this.faultData.reported_date, 'dd.MM.yyyy HH:mm', 'en')}`;
      this.reportedBy = this.faultData.reported_by;
      this.resolvedBy = this.faultData.resolved_by;

      const actualDuration = new Date(this.faultData.resolved_date).valueOf() - new Date(this.faultData.reported_date).valueOf()

      this.form.patchValue({
        title: this.faultData.title,
        reported_date: formatDate(this.faultData.reported_date, 'dd.MM.yyyy HH:mm', 'en'),
        closed_date: formatDate(this.faultData.resolved_date, 'dd.MM.yyyy HH:mm', 'en'),
        ticket_number: this.faultData.external_code,
        message: this.faultData.message,
        resolution_remark: this.faultData.remark,
        expected_duration: `${this.toHoursAndMinutes(this.faultData.duration)}`,
        actual_duration: `${this.toHoursAndMinutes(actualDuration)}`,
      })

      this.faultService.getLogsByFaultId(parseInt(this.id)).subscribe((data: any) => {

        console.log(data);
        this.logs = data.extra;

        this.form.patchValue({
          logs: this.logs.length
        })
      })

      this.faultData.list_of_channel_type_id.forEach((item: any) => {
        this.channelSelectedItems.push(item)
      })

      this.form.patchValue({channelType: this.channelSelectedItems})

      this.faultData.list_of_channel_group_id.forEach((item: any) => {
        this.groupSelectedItems.push(item)
      })

      this.form.patchValue({channelGroup: this.groupSelectedItems})
    })

    this.getChannelTypes()
    this.getChannelGroup()
  }

  onChannelItemSelect(item: any) {
    this.channelSelectedItems.push(item)

  }
  onChannelSelectAll(items: any) {
    this.channelSelectedItems = items
  }

  onUserItemSelect(item: any) {
    this.groupSelectedItems.push(item)
  }
  onUserSelectAll(items: any) {
    this.groupSelectedItems = items
  }

  getChannelTypes() {
    this.channelService.getChannelTypes().subscribe(data => {
      // console.log('channel types',data)
      this.channelDropdownList = data.extra
    })
  }

  submit() {

    this.faultService.updateLog({ id: this.faultData.id, fault_id: this.faultData.fault_id, remarks: this.form.value.resolution_remark, external_code: this.form.value.ticket_number.toString() }).subscribe(data => {
      console.log(data)
      if(data.status) {
        this.alertService.showSuccess('Sent!', data.message)
        this.router.navigate(['/history'])
      } else {
        this.alertService.showError('Error', data.message)
      }

    })
  }

  getChannelGroup() {

    this.channelService.getChannelsGroup().subscribe(data => {

      this.groupDropdownList = data.extra
      console.log('sfasdf', this.groupDropdownList)
    })
  }

  openModal(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }

  gotoDashboard() {
    this.router.navigate(['/history']);
  }
}
