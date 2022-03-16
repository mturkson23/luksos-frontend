import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-templates-list',
  templateUrl: './text-templates-list.component.html',
  styleUrls: ['./text-templates-list.component.css']
})
export class TextTemplatesListComponent implements OnInit {

  constructor(private router: Router) { }

  templates: any[] = []

  ngOnInit(): void {
  }

  goToEdit(id: any) {

    console.log(id)

    this.router.navigate(['/edit-message', id]);
  }

}
