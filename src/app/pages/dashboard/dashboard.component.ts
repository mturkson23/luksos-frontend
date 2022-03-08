import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaultService } from 'src/app/services/fault.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faults: any = []

  constructor(private router: Router, private faultService: FaultService) { }

  ngOnInit(): void {

    this.faultService.getFaults().subscribe((data: any) => {

      console.log(data)

      this.faults = data.extra;
    })
  }

  goToEdit(id: any) {

    console.log(id)

    this.router.navigate(['/edit-message', id]);
  }
}
