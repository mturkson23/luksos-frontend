import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userGroups: any = []

  constructor(private userService: UserService, private alertService: AlertService, private router: Router) {}

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
      saveButton: new FormControl('', []),
    })
    const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
    if (userRoleId && parseInt(userRoleId) != 1) {
      console.log(this.form.controls)
      this.form.controls['saveButton'].disable();
    }
    this.userService.getUserGroupTypes().subscribe(users => {
      console.log(users)
      this.userGroups = users.extra
    })
  }

  submit() {

    console.log(this.form.value)

    const password = this.form.value.password
    const confirm_password = this.form.value.confirm_password

    if(password != confirm_password) {

      this.alertService.showError('Password Mismatch', 'Passwords do not match')
      return
    }

    this.userService.addUser({
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email_address: this.form.value.email_address,
      password: this.form.value.password,
      confirm_password: this.form.value.confirm_password,
      group_type_id: parseInt(this.form.value.group_type_id)
     }).subscribe(data => {
      console.log(data)
      if(data.status) {
        this.alertService.showSuccess('Updated!', data.message)
        this.router.navigate(['/settings/user-management'])
      } else {
        this.alertService.showError('Error', data.message)
      }

    })
  }

}
