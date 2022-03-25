import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userGroups: any = []

  id: any;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) {}

  public form: FormGroup = new FormGroup({});

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
      group_type_id: new FormControl('', [
        // Validators.minLength(2),
        Validators.required
      ]),
    })

    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    this.userService.getUserById(parseInt(this.id)).subscribe(user => {

      this.form.patchValue({
        first_name: user.extra.first_name,
        last_name: user.extra.last_name,
        email_address: user.extra.email_address,
        group_type_id: user.extra.roleid
      })

    })

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

    this.userService.editUser({
        id: parseInt(this.id),
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        email_address: this.form.value.email_address,
        group_type_id: parseInt(this.form.value.group_type_id)
     }).subscribe(data => {
      console.log(data)
      if(data.status) {
        this.alertService.showSuccess('Updated!', data.message)
        this.router.navigate(['/users'])
      } else {
        this.alertService.showError('Error', data.message)
      }

    })
  }

  deleteUser() {

    this.userService.deleteUser(parseInt(this.id)).subscribe((data: any) => {
      console.log(data)
      if(data.status) {
        this.alertService.showSuccess('Deleted!', data.message)
        this.router.navigate(['/users'])
      } else {
        this.alertService.showError('Error', data.message)
      }
    })
  }

}
