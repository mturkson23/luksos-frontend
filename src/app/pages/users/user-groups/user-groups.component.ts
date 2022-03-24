import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {

  constructor(private userService: UserService) { }

  userGroups: any = []

  ngOnInit(): void {

    this.userService.getUserGroupTypes().subscribe(users => {
      console.log(users)
      this.userGroups = users.extra
    })
  }

}
