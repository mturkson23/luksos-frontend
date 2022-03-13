import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FaultService } from 'src/app/services/fault.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChannelService } from 'src/app/services/channel.service';

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

  id: any;

  constructor(private modalService: NgbModal, private router: Router, private faultService: FaultService, private activatedRoute: ActivatedRoute, private channelService: ChannelService) {


  }

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

      ])
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    console.log(this.id)



    this.channelDropdownList = []

    this.channelSelectedItems = [

    ];

    this.groupDropdownList = [
    ];

    this.groupSelectedItems = [

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

      console.log(data)

      this.faultData = data.extra;

      this.pageTitle = `Meldung ${this.id} "${this.faultData.title}" ${this.faultData.reported_date}`;
      this.reportedBy = this.faultData.reported_by;

      this.form.patchValue({
        title: this.faultData.title,
        message: this.faultData.message,
        timer: this.faultData.duration,
        reported: this.faultData.reported_date
      })

      this.channelSelectedItems = this.faultData.list_of_channel_type_id
      this.groupSelectedItems = this.faultData.list_of_user_group_id

      console.log(this.channelSelectedItems, 'gjhgj')
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
      console.log(data)
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
    });
  }  

  onSubmit() {

  }

  //getFault()
}
