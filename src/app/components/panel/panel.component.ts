import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Input() title: string = ''
  @Input() isInnerPage: boolean = true

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['/dashboard'])
  }

}
