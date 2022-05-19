import { AlertService } from 'src/app/services/alert-service.service';
import { ChannelService } from './../../services/channel.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { ConfigService } from 'src/app/services/config.service';
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

  relatedServices: any = []

  groupDropdownList: any = [];
  groupSelectedItems: any = [];
  groupDropdownSettings: any = {};

  users: any = []
  channels: any = []
  channelsGroup: any =[]
  templates: any = []
  messages: any = []
  reminder_timer: number = 10;

  constructor(private modalService: NgbModal, private router: Router, private userService: UserService, private channelService: ChannelService,
    private alertService: AlertService, private messageService: MessageService, private faultService: FaultService, private configService: ConfigService, ) { }

  public form: FormGroup = new FormGroup({
    type_id: new FormControl('', [
      Validators.required,
    ]),
    title: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    messages: new FormControl('Sehr geehrte Damen und Herren!\n\n\nMit freundlichen Grüßen\nIhr IT Servicedesk', [
      Validators.minLength(2),
      Validators.required
    ]),
    timer: new FormControl(60, [
      Validators.required
    ]),
    reminder_timer: new FormControl(10, [
      Validators.required
    ]),
    related_system_id: new FormControl("", [
      Validators.required
    ]),
    datum: new FormControl("", [
      Validators.required
    ]),
    zeit: new FormControl("", [
      Validators.required
    ]),
    aktivieren: new FormControl('', []),
    channels: new FormControl('', []),
    userGroups: new FormControl('', []),
  });

  ngOnInit(): void {
    const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
    if (userRoleId && parseInt(userRoleId) != 1) {
      this.form.controls['aktivieren'].disable();
    }
    console.log('userRoleId', userRoleId)
    // console.log(this.form)

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

    // this.getUserGroups()

    // this.getChannels()
    this.getChannelTypes()
    this.getTemplageTypes()
    this.getChannelGroup()
    this.getRelatedServices()
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
      console.log('channels group', this.channelsGroup)
    })
  }

  getUserGroups() {
    this.userService.getUserGroups().subscribe(data => {
      console.log(data)
      this.groupDropdownList = data.extra
    })
  }

  getRelatedServices() {
    this.configService.getRelatedServices().subscribe(data => {
      console.log(data)
      this.relatedServices = data.extra
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

  getChannel() {
    this.channelSelectedItems = [];
    this.groupSelectedItems = [];

    console.log(this.form.value.type_id)

    this.channelService.getChannel(parseInt(this.form.value.type_id)).subscribe(data => {

      console.log(data)

      data.extra.channel_id_list.forEach((item: any) => {

        console.log(item)

        this.channelSelectedItems.push(item)
      })

      this.form.patchValue({channels: this.channelSelectedItems})

      data.extra.user_group_id_list.forEach((item: any) => {
        this.groupSelectedItems.push(item)
      })

      this.form.patchValue({userGroups: this.groupSelectedItems})

      this.form.patchValue({
        name: data.extra.name,
        title: data.extra.title,
        messages: data.extra.messages,
        //type_id: data.extra.id
      })
    })
  }

  onSubmit() {
      if(this.channelSelectedItems.length == 0){
        this.alertService.showError('Validation Error', 'Please select at least one channel')
        return
      }

      if(this.groupSelectedItems.length == 0) {
        this.alertService.showError('Validation Error', 'Please select at least one user group')
        return
      }

      if(this.form.value.related_system_id == "") {
        this.alertService.showError('Validation Error', 'Select a Related System')
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
        related_system_id: parseInt(this.form.value.related_system_id),
        //"state":"PENDING",
        "type_id":1,
        "reported_date": new Date(`${this.form.value.datum} ${this.form.value.zeit}`)
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
