import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-edit-channels-setup',
  templateUrl: './edit-channels-setup.component.html',
  styleUrls: ['./edit-channels-setup.component.css']
})
export class EditChannelsSetupComponent implements OnInit {

  channelTypes: any = []
  channelGroups: any = []
  id: any;
  constructor(private channelService: ChannelService, private router: Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) {}

  public form: FormGroup = new FormGroup({
    identifier: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    channel_type: new FormControl('', [
      Validators.required
    ]),
    group_id: new FormControl('', [
      Validators.required
    ]),
    saveButton: new FormControl('', []),
  })

  ngOnInit(): void {
    this.channelService.getChannelTypes().subscribe(types => {
      // console.log(types)
      this.channelTypes = types.extra
    })
    this.channelService.getChannelsGroup().subscribe(groups => {
      // console.log(groups)
      this.channelGroups = groups.extra
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    this.channelService.getChannelById(parseInt(this.id)).subscribe(data => {
      this.form.patchValue({
        identifier: data.extra.identifier,
        address: data.extra.address,
        channel_type: data.extra.channel_type,
        group_id: data.extra.group_id
      })
    })

    const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
    if (userRoleId && parseInt(userRoleId) != 1) {
      this.form.controls['saveButton'].disable();
    }
  }
  goToChannels(){
    this.router.navigate(['/settings/channels'])
  }
  submit() {
    this.channelService.updateChannels({ ...this.form.value, group_id: parseInt(this.form.value.group_id), id: parseInt(this.id) }).subscribe(data => {
        console.log(data)
        if(data.status) {
          this.alertService.showSuccess('Updated!', data.message)
          this.router.navigate(['/settings/channels'])
        } else {
          this.alertService.showError('Error', data.message)
        }
    })

  }

}
