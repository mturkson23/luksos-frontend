import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-work-period-configs',
  templateUrl: './work-period-configs.component.html',
  styleUrls: ['./work-period-configs.component.css']
})
export class WorkPeriodConfigComponent implements OnInit {
  constructor(private configService: ConfigService, private router: Router) { }
  channels: any = [];

  ngOnInit(): void {
    this.configService.getWorkPeriods().subscribe(services => {
      this.channels = services.extra
    })
  }

  goToEditWorkPeriodConfig(id: any) {
    this.router.navigate(['/settings/edit-work-period-config', id])
  }

  goToAddWorkPeriod() {
    this.router.navigate(['/settings/add-work-period-config'])
  }
}
