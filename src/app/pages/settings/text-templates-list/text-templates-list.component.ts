import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-text-templates-list',
  templateUrl: './text-templates-list.component.html',
  styleUrls: ['./text-templates-list.component.css']
})
export class TextTemplatesListComponent implements OnInit {

  constructor(private router: Router, private channelService: ChannelService) { }

  templates: any[] = []

  getChannels() {

    this.channelService.getTemplates().subscribe(data => {

      console.log(data)

      this.templates = data.extra;
    })
  }

  ngOnInit(): void {

    this.getChannels()
  }

  goToEdit(id: any) {

    console.log(id)

    this.router.navigate(['/edit-message', id]);
  }

  deleteTemplate(id: any) {

    if(confirm("Are you sure?")) {

      this.channelService.deleteTemplate(id).subscribe(data => {

        this.getChannels()
      })
    }
  }
}
