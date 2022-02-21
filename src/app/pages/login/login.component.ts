import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appsettings } from 'src/app/models/Appsettings.model';
import { User } from 'src/app/models/User.model';
import { AlertService } from 'src/app/services/alert-service.service';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required
    ])
  });

  onSubmit() {

    this.isLoading = true;

    this.authService.preauthenticate().then((settings: any) => {

      this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password, settings).subscribe((data: any) => {

        if(data.status) {

          console.log(data.extra)

          this.authService.saveTokens(data.message, '', { username: this.loginForm.value.username, fullName: data.extra.fullName } as User).then(() => {
            this.alertService.showSuccess('Authenticated', 'You are now Logged In!')
            this.router.navigateByUrl('/').then(() => {
              ApplicationService.Appsettings = settings as Appsettings;
              this.authService.saveServerUrl(settings.serverUrl)
              location.reload();
            })
          })
        } else {

          console.log(data)
          this.alertService.showError('Authentication Failed', data.message)
        }

        this.isLoading = false;
      })
    })
  }

  ngOnInit(): void {
  }

}
