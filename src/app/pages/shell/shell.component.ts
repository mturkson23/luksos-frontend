import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private router: Router) {

    if(router.url == '/') {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
  }

}
