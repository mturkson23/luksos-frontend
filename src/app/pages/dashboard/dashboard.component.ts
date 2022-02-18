import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  messages: any = []

  constructor(private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.messageService.getMessages().subscribe((data: any) => {

      console.log(data)

      this.messages = data.extra;
    })
  }

  goToEdit() {

    this.router.navigate(['/edit-message']);
  }

}
