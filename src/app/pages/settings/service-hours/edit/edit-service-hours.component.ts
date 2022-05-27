import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-service-hours',
  templateUrl: './edit-service-hours.component.html',
  styleUrls: ['./edit-service-hours.component.css']
})
export class EditServiceHoursComponent implements OnInit {
  id: any;

  webServices: any = [];
  daysArray: any = [
    {id:0, name:'Sonntag'},
    {id:1, name:'Montag'},
    {id:2, name:'Dienstag'},
    {id:3, name:'Mittwoch'},
    {id:4, name:'Donnerstag'},
    {id:5, name:'Freitag'},
    {id:6, name:'Samstag'},
  ];

  constructor(private configService: ConfigService, private router: Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) { }

  public form: FormGroup = new FormGroup({
    web_system_id: new FormControl(0, [
      Validators.required
    ]),
    work_hours_per_day: new FormControl('', [
      Validators.required
    ]),
    work_start_day: new FormControl('', [
      Validators.required
    ]),
    work_end_day: new FormControl('', [
      Validators.required
    ]),
    work_start_time: new FormControl({}, [
      // Validators.required
    ]),
    work_end_time: new FormControl({}, [
      // Validators.required
    ]),
    jan_work_hours: new FormControl('', []),
    feb_work_hours: new FormControl('', []),
    mar_work_hours: new FormControl('', []),
    apr_work_hours: new FormControl('', []),
    may_work_hours: new FormControl('', []),
    june_work_hours: new FormControl('', []),
    july_work_hours: new FormControl('', []),
    aug_work_hours: new FormControl('', []),
    sep_work_hours: new FormControl('', []),
    oct_work_hours: new FormControl('', []),
    nov_hours: new FormControl('', []),
    dec_work_hours: new FormControl('', []),
    saveButton: new FormControl('', []),
  })

  ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')

      this.configService.getRelatedServices().subscribe(data => {
        this.webServices = data.extra;
      });

      this.configService.getServiceHoursById(parseInt(this.id)).subscribe(data => {
        this.form.patchValue({
          web_system_id: data.extra.web_system_id,
          work_start_day: data.extra.work_start_day,
          work_end_day: data.extra.work_end_day,
          work_hours_per_day: data.extra.work_hours_per_day,
          work_start_time: this.timeSpanToString(data.extra.work_start_time),
          work_end_time: this.timeSpanToString(data.extra.work_end_time),
          jan_work_hours: data.extra.jan_work_hours,
          feb_work_hours: data.extra.feb_work_hours,
          mar_work_hours: data.extra.mar_work_hours,
          apr_work_hours: data.extra.apr_work_hours,
          may_work_hours: data.extra.may_work_hours,
          june_work_hours: data.extra.june_work_hours,
          july_work_hours: data.extra.july_work_hours,
          aug_work_hours: data.extra.aug_work_hours,
          sep_work_hours: data.extra.sep_work_hours,
          oct_work_hours: data.extra.oct_work_hours,
          nov_hours: data.extra.nov_hours,
          dec_work_hours: data.extra.dec_work_hours,
        })
      })

      const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
      if (userRoleId && parseInt(userRoleId) != 1) {
        this.form.controls['saveButton'].disable();
      }
  }

  submit() {
    const payload = {
      ...this.form.value,
      work_start_time: this.stringToTimeSpan(this.form.value.work_start_time),
      work_end_time: this.stringToTimeSpan(this.form.value.work_end_time),
      id: parseInt(this.id)      
    };

    this.configService.editServiceHours(payload).subscribe(data => {
      if(data.status) {
        this.alertService.showSuccess('Updated Service Hours Configuration!', data.message)
        this.router.navigate(['/settings/service-hours'])
      } else {
        this.alertService.showError('Error', data.message)
      }
    })
  }

  timeSpanToString(ticksObject: any){
    const timeObject = `${ticksObject.hours.toString().padStart(2, '0')}:${ticksObject.minutes.toString().padStart(2, '0')}`;
    return timeObject;    
  }

  stringToTimeSpan(timeString: string){
    const timeSpanArray = timeString.split(":");
    return {
      hours: parseInt(timeSpanArray[0]),
      minutes: parseInt(timeSpanArray[1]),
      seconds: 0,
      milliseconds: 0,
      days: 0,
    }
  }

  goToWorkHours() {
    this.router.navigate(['/settings/service-hours']);
  }  

}
