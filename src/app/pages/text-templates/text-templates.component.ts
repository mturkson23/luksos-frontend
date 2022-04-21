import { AlertService } from 'src/app/services/alert-service.service';
import { ChannelService } from './../../services/channel.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-text-templates',
  templateUrl: './text-templates.component.html',
  styleUrls: ['./text-templates.component.css']
})
export class TextTemplatesComponent implements OnInit {

  channelDropdownList: any = [];
  channelSelectedItems: any = [];
  channelDropdownSettings: any = {};
  channelTypeDropdownSettings: any = {};

  userDropdownList: any = [];
  userSelectedItems: any = [];
  userDropdownSettings: any = {};

  users: any = []
  channels: any = []
  templates: any = []

  constructor(private modalService: NgbModal, private router: Router, private userService: UserService, private channelService: ChannelService, private alertService: AlertService) { }

  public form: FormGroup = new FormGroup({
    type_id: new FormControl(0, []),
    name: new FormControl('', [
      Validators.required,
    ]),
    title: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    messages: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    channels: new FormControl('', []),
    userGroups: new FormControl('', []),
    // timer: new FormControl('', [
    //   Validators.required
    // ])
    vorlage_speichern: new FormControl('', []),
  });

  ngOnInit(): void {
    const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
    if (userRoleId && parseInt(userRoleId) != 1) {
      this.form.controls['vorlage_speichern'].disable();
    }

    this.channelDropdownList = []

    this.channelSelectedItems = [

    ];

    this.userDropdownList = [
    ];

    this.userSelectedItems = [

    ];

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

    this.userDropdownSettings = {
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
    this.getTemplates()
    // this.getTemplageTypes()

  }

  getChannel() {
    if (this.form.value.type_id == ""){
      this.channelSelectedItems = [];
      this.userSelectedItems = [];
      this.form.patchValue({
        name: "",
        title: "",
        messages: "",
      });
      return;
    }

    console.log(this.form.value.type_id)

    this.channelService.getChannel(parseInt(this.form.value.type_id)).subscribe(data => {
      this.userSelectedItems = [];
      this.channelSelectedItems = [];

      console.log(data)

      data.extra.channel_id_list.forEach((item: any) => {

        console.log(item)

        this.channelSelectedItems.push(item)
      })

      this.form.patchValue({channels: this.channelSelectedItems})

      data.extra.user_group_id_list.forEach((item: any) => {
        this.userSelectedItems.push(item)
      })

      this.form.patchValue({userGroups: this.userSelectedItems})

      this.form.patchValue({
        name: data.extra.name,
        title: data.extra.title,
        messages: data.extra.messages,
        type_id: data.extra.id
      })
    })
  }

  onChannelItemSelect(item: any) {
    this.channelSelectedItems.push(item)
  }
  onChannelSelectAll(items: any) {
    this.channelSelectedItems = items
  }

  onUserItemSelect(item: any) {
    this.userSelectedItems.push(item)
  }
  onUserSelectAll(items: any) {
    this.userSelectedItems = items
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
    })
  }

  getChannelTypes() {
    this.channelService.getChannelTypes().subscribe(data => {
      console.log('::Log:: fetched channel types',data)
      this.channelDropdownList = data.extra
    });
  }

  getUserGroups() {

    this.channelService.getChannelGroupTypes().subscribe(data => {

      console.log(data)
      this.userDropdownList = data.extra
    })
  }

  getTemplageTypes() {

    this.channelService.getTemplateTypes().subscribe(data => {

      this.templates = data.extra
    })
  }

  getTemplates() {
    this.channelService.getTemplates().subscribe(data => {
      this.templates = data.extra
    })
  }

  onSubmit() {

      if(this.channelSelectedItems.length == 0){
        this.alertService.showError('Select a Channel', 'Please select at least one channel')
        return
      }

      if(this.userSelectedItems.length == 0) {

        this.alertService.showError('Select a User Group', 'Please select at least one user group')
        return
      }

      this.channelSelectedItems = [...new Set(this.channelSelectedItems.map((item: any) => item.id))].join(',')
      this.userSelectedItems = [...new Set(this.userSelectedItems.map((item: any) => item.id))].join(',')

      this.channelService.createChannel({
        ...this.form.value,
        type_id: 1,
        id: Number.parseInt(this.form.value.type_id),
        channel_id: this.channelSelectedItems,
        user_groups_id: this.userSelectedItems
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
