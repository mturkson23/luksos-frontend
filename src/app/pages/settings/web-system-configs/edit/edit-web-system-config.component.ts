import { AlertService } from 'src/app/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-web-system-configs',
  templateUrl: './edit-web-system-config.component.html',
  styleUrls: ['./edit-web-system-config.component.css']
})
export class EditWebSystemConfigsComponent implements OnInit {

  id: any;

  constructor(private configService: ConfigService, private router: Router, private alertService: AlertService, private activatedRoute: ActivatedRoute) { }

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(2),
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    saveButton: new FormControl('', []),
  })

  ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')

      this.configService.getRelatedServiceById(parseInt(this.id)).subscribe(data => {
        this.form.patchValue({
          name: data.extra.name,
          description: data.extra.description
        })
      })

      const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
      if (userRoleId && parseInt(userRoleId) != 1) {
        this.form.controls['saveButton'].disable();
      }      
  }

  submit() {
    if(confirm("Are you sure you want to delete this record?")) {
      this.configService.deleteWebSystem(parseInt(this.id)).subscribe(data => {
        if(data.status) {
          this.alertService.showSuccess('Deleted Web System Config!', data.message)
          this.router.navigate(['/settings/web-system-configs'])
        } else {
          this.alertService.showError('Error', data.message)
        }
      })
    }     
  }

  goToWebSystems() {
    this.router.navigate(['/settings/web-system-configs']);
  }  

}
