import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel-types',
  templateUrl: './channel-types.component.html',
  styleUrls: ['./channel-types.component.css']
})
export class ChannelTypesComponent implements OnInit {

  constructor(private channelService: ChannelService, private router: Router) { }

  channels: any = []

  ngOnInit(): void {

    this.channelService.getChannelsGroup().subscribe(channels => {

      console.log(channels)

      this.channels = channels.extra
    })
  }

  goToChannelGroup(id: any) {
    this.router.navigate(['/settings/edit-channel-group', id])
  }

  goToUserAddChannelGroup() {
    this.router.navigate(['/settings/add-channel-group'])
  }

}
