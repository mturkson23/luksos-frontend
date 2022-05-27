import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-service-hours',
  templateUrl: './service-hours.component.html',
  styleUrls: ['./service-hours.component.css']
})
export class ServiceHoursComponent implements OnInit {
  constructor(private configService: ConfigService, private router: Router) { }
  channels: any = [];

  ngOnInit(): void {
    this.configService.getServiceHours().subscribe(services => {
      this.channels = services.extra
    })
  }

  goToEditServiceHours(id: any) {
    this.router.navigate(['/settings/edit-service-hours', id])
  }

  goToAddServiceHours() {
    this.router.navigate(['/settings/add-work-service-hours'])
  }
}
