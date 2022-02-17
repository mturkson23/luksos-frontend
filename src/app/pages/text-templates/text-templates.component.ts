import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-text-templates',
  templateUrl: './text-templates.component.html',
  styleUrls: ['./text-templates.component.css']
})
export class TextTemplatesComponent implements OnInit {

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  users: any = []

  constructor(private modalService: NgbModal, private router: Router, private userService: UserService) { }

  public form: FormGroup = new FormGroup({});

  ngOnInit(): void {

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  gotoDashboard(content: any) {


    this.router.navigate(['/dashboard']);
    this.modalService.open(content);
  }

  getUsers() {

    this.userService.getUsers().subscribe(data => {
      this.users = data.extra
    })
  }

}
