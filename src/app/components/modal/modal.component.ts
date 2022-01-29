import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('title') title: string = '';

  @ContentChild('buttonContent') buttonContent: ElementRef | undefined;
  @ContentChild('content') content: ElementRef | undefined;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {

  }
}
