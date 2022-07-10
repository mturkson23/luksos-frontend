import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channels-setup',
  templateUrl: './channels-setup.component.html',
  styleUrls: ['./channels-setup.component.css']
})
export class ChannelsSetupComponent implements OnInit {

  constructor(private channelService: ChannelService, private router: Router) { }

  channels: any = []

  ngOnInit(): void {

    this.channelService.getChannels().subscribe(channels => {

      console.log(channels)

      this.channels = channels.extra
    })
  }

  goToAddChannel(){
    this.router.navigate(['/settings/add-channels'])
  }
  goToChannel(id: any) {
    console.log('::~', id)
    this.router.navigate(['/settings/edit-channels', id])
  }

}
