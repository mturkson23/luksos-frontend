import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaultService } from 'src/app/services/fault.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  faults: any = []

  constructor(private router: Router, private faultService: FaultService) { }

  ngOnInit(): void {

    this.faultService.getFaults().subscribe((data: any) => {

      console.log(data)

      this.faults = data.extra;
    })
  }

  goToEdit() {

    this.router.navigate(['/edit-message']);
  }

}
