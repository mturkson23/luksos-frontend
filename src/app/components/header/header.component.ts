import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDisabled: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // disable buttons for non-admin users
    const userRoleId = localStorage.getItem('AUTH_USER_ROLE_ID');
    if (userRoleId && parseInt(userRoleId) != 1) {
      this.isDisabled = true;
    }
  }

  logOut() {

    if(window.confirm('Are you sure you want to log out?')) {

      localStorage.clear()
      location.reload()
    }
  }

}
