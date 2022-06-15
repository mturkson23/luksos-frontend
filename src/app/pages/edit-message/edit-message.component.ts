import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FaultService } from 'src/app/services/fault.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from 'src/app/services/channel.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { formatDate } from '@angular/common';
// import { CHANNEL_TYPE } from "./type";

// import { CustomDatePipe } from 'src/app/components/utils/custom.datepipe';
@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {

  channelDropdownList: any = [];
  channelSelectedItems: any = [];
  channelDropdownSettings: any = {};
  channelTypeDropdownSettings: any = {};

  groupDropdownList: any = [];
  groupSelectedItems: any = [];
  groupDropdownSettings: any = {};

  pageTitle: string = '';
  reportedBy: string = '';

  faultData: any = {};
  logs: any = [];

  id: any;

  constructor(private modalService: NgbModal, private router: Router, private faultService: FaultService, private activatedRoute: ActivatedRoute, private channelService: ChannelService, private alertService: AlertService) {}

  public form: FormGroup = new FormGroup({})
  public modalForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      timer: new FormControl('', [
        Validators.required
      ]),
      reported_date: new FormControl('', [

      ]),
      channelType: new FormControl('', []),
      channelGroup: new FormControl('', []),

      zwischenmeldung_erstellen: new FormControl('', []),
      gutmeldung_schicken: new FormControl('', []),
      related_system: new FormControl('', []),
      aktivieren: new FormControl('', []),
      logs: new FormControl(0, []),
    }) 

    this.modalForm = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      senden: new FormControl('', []),
    })

    const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
    if (userRoleId && parseInt(userRoleId) != 1) {
      this.modalForm.controls['senden'].disable();
      this.form.controls['gutmeldung_schicken'].disable();
      this.form.controls['aktivieren'].disable();
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

    this.faultService.getFault(parseInt(this.id)).subscribe((data: any) => {
      // console.log(data)
      this.faultData = data.extra;

      this.pageTitle = `Meldung ${this.id} "${this.faultData.title}" ${formatDate(this.faultData.date_created, 'dd.MM.yyyy HH:mm', 'en')}`;
      this.reportedBy = this.faultData.reported_by;

      this.form.patchValue({
        title: this.faultData.title,
        message: this.faultData.message,
        timer: `${this.faultData.duration} mins`,
        reported_date: formatDate(this.faultData.date_created, 'dd.MM.yyyy HH:mm', 'en'),
        related_system: this.faultData.related_system
      })

      this.modalForm.patchValue({
        title: this.faultData.title,
        message: "Sehr geehrte Damen und Herren!\n\n\nMit freundlichen Grüßen\nIhr IT Servicedesk"
      })

      // this.modalForm.disable()

      // this.faultData.list_of_channel_type_ids.forEach((item: any) => {
      this.faultData.list_of_channel_type_id.forEach((item: any) => {
        // console.log('selected item',item)
        this.channelSelectedItems.push(item)
      })

      this.form.patchValue({channelType: this.channelSelectedItems})

      // updates will need to be made for the backend so this returns data not on user group but on channel groups
      // this.faultData.list_of_channel_group_ids.forEach((item: any) => {
      this.faultData.list_of_channel_group_id.forEach((item: any) => {
        this.groupSelectedItems.push(item)
      })

      this.form.patchValue({channelGroup: this.groupSelectedItems})
    })

    this.getChannelTypes()
    this.getChannelGroup()


    this.faultService.getLogsByFaultId(parseInt(this.id)).subscribe((data: any) => {
      console.log(data);
      this.logs = data.extra;
      this.form.patchValue({
        logs: this.logs.length
      })
    })        
  }

  onChannelItemSelect(item: any) {
    this.channelSelectedItems.push(item)
    // console.log(this.channelSelectedItems)
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

  getChannelGroup() {

    this.channelService.getChannelsGroup().subscribe(data => {

      this.groupDropdownList = data.extra
      console.log('sfasdf', this.groupDropdownList)
    })
  }

  openModal(content: any) {
    console.log(content)
    this.modalService.open(content, {size: 'lg'});
  }

  closeFault(faultId: number) {
    console.log('here', faultId)
    this.faultService.closeFault(faultId).subscribe(data => {
      console.log('submitted. response::', data)

      this.router.navigate(['/dashboard']);

      if(data.status) {
        this.alertService.showSuccess('Fault Closed', data.message)
      } else {
        this.alertService.showError('Error', data.message)
      }

    });
  }

  onSubmit() {

    if(this.channelSelectedItems.length == 0){
      this.alertService.showError('Select a Channel', 'Please select at least one channel')
      return
    }

    if(this.groupSelectedItems.length == 0) {

      this.alertService.showError('Select a Channel Group', 'Please select at least one channel group')
      return
    }

    // const ebo = this.channelSelectedItems.map((item: any) => item.id).join(',')
    // console.log('something else',ebo)
    const channelSelectedItem = [...new Set(this.channelSelectedItems.map((item: any) => item.id))].join(',')
    const groupSelectedItem = [...new Set(this.groupSelectedItems.map((item: any) => item.id))].join(',')

    console.log(this.channelSelectedItems, this.groupSelectedItems)

    this.faultService.updateFault({
      id: parseInt(this.id),
      ...this.form.value,
      //type_id: Number.parseInt(this.form.value.type_id),
      channel_type_id: channelSelectedItem,
      channel_group_id: groupSelectedItem,
      "duration": Number.parseInt(this.form.value.timer),
      "internal_code":`${this.id}`,
      "external_code":`${this.id}`,
      //"state":"PENDING",
      "type_id":1,
    }).subscribe(data => {
      this.router.navigate(['/dashboard']);

      if(data.status) {
        this.alertService.showSuccess('Message Added', data.message)
      } else {
        this.alertService.showError('Error', data.message)
      }
    })
  }

  submitMessages(e: any) {
    console.log('messages', this.form.value.messages)

    this.faultService.sendMessages({
      id: this.faultData.id,
      ...this.modalForm.value,
    }).subscribe(data => {
      if(data.status) {
        this.alertService.showSuccess('Sent!', data.message)
      } else {
        this.alertService.showError('Error', data.message)
      }

      this.modalService.dismissAll()
    })
  }

  //getFault()
}
