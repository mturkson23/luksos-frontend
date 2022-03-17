import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FaultService } from 'src/app/services/fault.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from 'src/app/services/channel.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { CHANNEL_TYPE } from "./type";
@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {

  channelDropdownList: any = [];
  channelSelectedItems: Array<CHANNEL_TYPE> = [];
  channelDropdownSettings: any = {};
  channelTypeDropdownSettings: any = {};

  groupDropdownList: any = [];
  groupSelectedItems: any = [];
  groupDropdownSettings: any = {};

  pageTitle: string = '';
  reportedBy: string = '';

  faultData: any = {};

  id: any;

  constructor(private modalService: NgbModal, private router: Router, private faultService: FaultService, private activatedRoute: ActivatedRoute, private channelService: ChannelService, private alertService: AlertService) {}

  public form: FormGroup = new FormGroup({});

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
      reported: new FormControl('', [

      ]),
      channelType: new FormControl('', []),
      channelGroup: new FormControl('', []),
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    // console.log(this.id)

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

      this.pageTitle = `Meldung ${this.id} "${this.faultData.title}" ${this.faultData.reported_date}`;
      this.reportedBy = this.faultData.reported_by;

      this.form.patchValue({
        title: this.faultData.title,
        message: this.faultData.message,
        timer: this.faultData.duration,
        reported: this.faultData.reported_date
      })

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
    this.modalService.open(content);
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
    // this.channelSelectedItems = this.channelSelectedItems.map((item: any) => item.id).join(',')
    this.groupSelectedItems = this.groupSelectedItems.map((item: any) => item.id).join(',')

    this.faultService.updateFault({
      ...this.form.value,
      //type_id: Number.parseInt(this.form.value.type_id),
      channel_type_id: this.channelSelectedItems,
      channel_group_id: this.groupSelectedItems,
      "duration": Number.parseInt(this.form.value.timer),
      "internal_code":"2",
      "external_code":"4",
      message: this.form.value.messages,
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

  //getFault()
}
