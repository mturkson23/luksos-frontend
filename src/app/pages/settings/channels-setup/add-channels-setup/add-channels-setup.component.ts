import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-add-channels-setup',
  templateUrl: './add-channels-setup.component.html',
  styleUrls: ['./add-channels-setup.component.css']
})
export class AddChannelsSetupComponent implements OnInit {

  channelTypes: any = []
  channelGroups: any = []

  constructor(private channelService: ChannelService, private router: Router, private alertService: AlertService) { }

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
      const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
      if (userRoleId && parseInt(userRoleId) != 1) {
        this.form.controls['saveButton'].disable();
      }
  }
  goToChannels(){
    this.router.navigate(['/settings/channels'])
  }
  submit() {
    this.channelService.addChannel({ ...this.form.value,
      group_id: parseInt(this.form.value.group_id),
    }).subscribe(data => {
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
