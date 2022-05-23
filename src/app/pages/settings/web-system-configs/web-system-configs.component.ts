import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-web-system-configs',
  templateUrl: './web-system-configs.component.html',
  styleUrls: ['./web-system-configs.component.css']
})
export class WebSystemConfigsComponent implements OnInit {

  constructor(private configService: ConfigService, private router: Router) { }

  channels: any = []

  ngOnInit(): void {
    this.configService.getRelatedServices().subscribe(services => {
      this.channels = services.extra
    })
  }

  goToEditWebSystemConfig(id: any) {
    this.router.navigate(['/settings/edit-web-system-config', id])
  }

  goToAddWebSystem() {
    this.router.navigate(['/settings/add-web-system-config'])
  }

}
