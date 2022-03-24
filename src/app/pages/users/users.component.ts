import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  users: any = []

  ngOnInit(): void {

    this.userService.getUsers().subscribe(users => {
      console.log(users)
      this.users = users.extra
    })
  }

  goToUserAddUser() {

    this.router.navigate(['/settings/add-user'])
  }

  goToUser(id: any) {

    this.router.navigate(['/settings/edit-user', id])
  }

}
