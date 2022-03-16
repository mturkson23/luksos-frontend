import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-templates-groups',
  templateUrl: './text-templates-groups.component.html',
  styleUrls: ['./text-templates-groups.component.css']
})
export class TextTemplatesGroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToEdit(id: any) {

    console.log(id)

    // this.router.navigate(['/edit-message', id]);
  }

}
