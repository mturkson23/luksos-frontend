import { AlertService } from 'src/app/services/alert-service.service';
import { ChannelService } from './../../services/channel.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { FaultService } from 'src/app/services/fault.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  channelDropdownList: any = [];
  channelSelectedItems: any = [];
  channelDropdownSettings: any = {};
  channelTypeDropdownSettings: any = {};

  groupDropdownList: any = [];
  groupSelectedItems: any = [];
  groupDropdownSettings: any = {};

  users: any = []
  channels: any = []
  channelsGroup: any =[]
  templates: any = []
  messages: any = []
  reminder_timer: number = 10;

  constructor(private modalService: NgbModal, private router: Router, private userService: UserService, private channelService: ChannelService, private alertService: AlertService, private messageService: MessageService, private faultService: FaultService) { }

  public form: FormGroup = new FormGroup({
    type_id: new FormControl('', [
      Validators.required,
    ]),
    title: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    messages: new FormControl('\n\n\nMit freundlichen Grüßen', [
      Validators.minLength(2),
      Validators.required
    ]),
    timer: new FormControl(60, [
      Validators.required
    ]),
    reminder_timer: new FormControl(10, [
      Validators.required
    ]),
  });

  ngOnInit(): void {

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

    this.getUserGroups()

    // this.getChannels()
    this.getChannelTypes()
    this.getTemplageTypes()
    this.getChannelGroup()

    this.getMessages()

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

  gotoDashboard(content: any) {
    this.router.navigate(['/dashboard']);
    this.modalService.open(content);
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log(data)
      this.users = data.extra
    })
  }

  getChannels() {
    this.channelService.getChannels().subscribe(data => {
      console.log(data)
      this.channelDropdownList = data.extra
    })
  }

  getChannelTypes() {
    this.channelService.getChannelTypes().subscribe(data => {
      console.log(data)
      this.channelDropdownList = data.extra
    })
  }

  getChannelGroup() {
    this.channelService.getChannelsGroup().subscribe(data => {
      this.groupDropdownList = data.extra
      console.log('sfasdf', this.channelsGroup)
    })
  }

  getUserGroups() {
    this.userService.getUserGroups().subscribe(data => {
      console.log(data)
      this.groupDropdownList = data.extra
    })
  }

  getMessages() {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data.extra
      console.log(data)
    })
  }

  getTemplageTypes() {
    this.channelService.getTemplateTypes().subscribe(data => {
      this.templates = data.extra
    })
  }

  updateForm(e: any) {
    const id = e.target.value
    const message = this.messages.find((x: any) => x.id == id)
    if(message) {
      this.form.patchValue({
        title: message.title,
        messages: message.messages,
        timer: message.timer,
      })
    }
  }

  onSubmit() {
      if(this.channelSelectedItems.length == 0){
        this.alertService.showError('Select a Channel', 'Please select at least one channel')
        return
      }

      if(this.groupSelectedItems.length == 0) {
        this.alertService.showError('Select a User Group', 'Please select at least one user group')
        return
      }

      this.channelSelectedItems = this.channelSelectedItems.map((item: any) => item.id).join(',')
      this.groupSelectedItems = this.groupSelectedItems.map((item: any) => item.id).join(',')

      console.log(this.channelSelectedItems, this.groupSelectedItems)

      this.faultService.createFault({
        ...this.form.value,
        //type_id: Number.parseInt(this.form.value.type_id),
        channel_type_id: this.channelSelectedItems,
        channel_group_id: this.groupSelectedItems,
        "duration": Number.parseInt(this.form.value.timer),
        "internal_code":"2",
        "external_code":"4",
        message: this.form.value.messages,
        reminder_timer: this.form.value.reminder_timer,
        //"state":"PENDING",
        "type_id":1,
        "reported_date": new Date()
      }).subscribe(data => {
        this.router.navigate(['/dashboard']);
        if(data.status) {
          this.alertService.showSuccess('Message Added', data.message)
        } else {
          this.alertService.showError('Error', data.message)
        }
      })
  }

}
