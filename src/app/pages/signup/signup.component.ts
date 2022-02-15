import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signupForm: FormGroup = new FormGroup({});

  onSubmit() {

    // this.authService.signUp(this.signupForm.value.username, this.signupForm.value.password).subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

  }


  ngOnInit(): void {
  }

}
