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

  userDropdownList: any = [];
  userSelectedItems: any = [];
  userDropdownSettings: any = {};

  users: any = []
  channels: any = []

  constructor(private modalService: NgbModal, private router: Router, private userService: UserService, private channelService: ChannelService, private alertService: AlertService) { }

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(2),
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
    timer: new FormControl('', [
      Validators.required
    ])
  });

  ngOnInit(): void {

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

    this.getChannels()

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
      this.channelDropdownList = data.extra
    })
  }

  getUserGroups() {

    this.userService.getUserGroups().subscribe(data => {

      console.log(data)
      this.userDropdownList = data.extra
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

      this.channelService.createChannel({
        ...this.form.value,
        timer: 60,
        channel_id: this.channelSelectedItems[0].id,
        user_group_id: this.userSelectedItems[0].id
      }).subscribe(data => {
        this.router.navigate(['/dashboard']);
      })
  }
}
