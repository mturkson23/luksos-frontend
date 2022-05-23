import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-work-period-configs',
  templateUrl: './edit-work-period-config.component.html',
  styleUrls: ['./edit-work-period-config.component.css']
})
export class EditWorkPeriodConfigComponent implements OnInit {
  id: any;
  constructor(private configService: ConfigService, private router: Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) { }

  public form: FormGroup = new FormGroup({
    config_type: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    jan: new FormControl('', []),
    feb: new FormControl('', []),
    mar: new FormControl('', []),
    apr: new FormControl('', []),
    may: new FormControl('', []),
    june: new FormControl('', []),
    july: new FormControl('', []),
    aug: new FormControl('', []),
    sep: new FormControl('', []),
    oct: new FormControl('', []),
    nov: new FormControl('', []),
    dec: new FormControl('', []),
    saveButton: new FormControl('', []),
  })

  ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')

      this.configService.getWorkPeriodById(parseInt(this.id)).subscribe(data => {
        this.form.patchValue({
          config_type: data.extra.config_type,
          description: data.extra.description,
          jan: data.extra.jan,
          feb: data.extra.feb,
          mar: data.extra.mar,
          apr: data.extra.apr,
          may: data.extra.may,
          june: data.extra.june,
          july: data.extra.july,
          aug: data.extra.aug,
          sep: data.extra.sep,
          oct: data.extra.oct,
          nov: data.extra.nov,
          dec: data.extra.dec,
        })
      })

      const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
      if (userRoleId && parseInt(userRoleId) != 1) {
        this.form.controls['saveButton'].disable();
      }      
  }

  submit() {
    this.configService.editWorkPeriodConfig({...this.form.value, id: parseInt(this.id)}).subscribe(data => {
      if(data.status) {
        this.alertService.showSuccess('Updated Work Period Config!', data.message)
        this.router.navigate(['/settings/work-period-configs'])
      } else {
        this.alertService.showError('Error', data.message)
      }
    })
  }

  goToWorkPeriods() {
    this.router.navigate(['/settings/work-period-configs']);
  }  

}
