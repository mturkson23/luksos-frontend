import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-add-channel-type',
  templateUrl: './add-channel-type.component.html',
  styleUrls: ['./add-channel-type.component.css']
})
export class AddChannelTypeComponent implements OnInit {

  channelTypes: any = []

  constructor(private channelService: ChannelService, private router: Router, private alertService: AlertService) { }

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    type_id: new FormControl('', [
      Validators.required
    ]),
    saveButton: new FormControl('', []),
  })

  ngOnInit(): void {

      this.channelService.getChannelTypes().subscribe(channels => {
        console.log(channels)
        this.channelTypes = channels.extra
      })

      const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
      if (userRoleId && parseInt(userRoleId) != 1) {
        this.form.controls['saveButton'].disable();
      }
  }

  submit() {

    this.channelService.addChannelGroup({ ...this.form.value, type_id: parseInt(this.form.value.type_id) }).subscribe(data => {

        console.log(data)
        if(data.status) {
          this.alertService.showSuccess('Updated!', data.message)
          this.router.navigate(['/settings/channel-groups'])
        } else {
          this.alertService.showError('Error', data.message)
        }
    })

  }

}
