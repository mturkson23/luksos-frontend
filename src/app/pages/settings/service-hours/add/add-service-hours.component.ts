import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-service-hours',
  templateUrl: './add-service-hours.component.html',
  styleUrls: ['./add-service-hours.component.css']
})
export class AddServiceHoursComponent implements OnInit {

  constructor(private configService: ConfigService, private router: Router, private alertService: AlertService) { }

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    saveButton: new FormControl('', []),
  })

  ngOnInit(): void {
      const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
      if (userRoleId && parseInt(userRoleId) != 1) {
        this.form.controls['saveButton'].disable();
      }
  }

  submit() {
    this.configService.addWebSystemConfig({ ...this.form.value }).subscribe(data => {
        if(data.status) {
          this.alertService.showSuccess('Web System Configuration saved!', data.message)
          this.router.navigate(['/settings/web-system-configs'])
        } else {
          this.alertService.showError('Error', data.message)
        }
    })

  }

}
