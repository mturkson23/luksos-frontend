import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-edit-channel-type',
  templateUrl: './edit-channel-type.component.html',
  styleUrls: ['./edit-channel-type.component.css']
})
export class EditChannelTypeComponent implements OnInit {

  channelTypes: any = []

  id: any;

  constructor(private channelService: ChannelService, private router: Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) { }

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    type_id: new FormControl('', [
      Validators.required
    ]),
  })

  ngOnInit(): void {

      this.channelService.getChannelTypes().subscribe(channels => {
        console.log(channels)
        this.channelTypes = channels.extra
      })

      this.id = this.activatedRoute.snapshot.paramMap.get('id')

      this.channelService.getChannelGroupById(parseInt(this.id)).subscribe(data => {

        this.form.patchValue({
          name: data.extra.name,
          type_id: data.extra.type_id
        })
      })
  }

  submit() {

    this.channelService.updateChannelGroup({ ...this.form.value, type_id: parseInt(this.form.value.type_id), id: parseInt(this.id) }).subscribe(data => {

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
