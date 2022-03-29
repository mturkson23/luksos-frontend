import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private alertService: AlertService, private router: Router, private authService: AuthService) {}

  public form: FormGroup = new FormGroup({})

  ngOnInit(): void {

    this.form = new FormGroup({
      first_name: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      email_address: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      confirm_password: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      group_type_id: new FormControl('', [
        // Validators.minLength(2),
        Validators.required
      ]),
    })

    this.form.disable()

    const { id } = this.authService.currentUser() as any

    this.userService.getUserById(id).subscribe(user => {

      this.form.patchValue({
        first_name: user.extra.first_name,
        last_name: user.extra.last_name,
        email_address: user.extra.email_address,
        group_type_id: user.extra.roleid
      })
    })
  }
}
