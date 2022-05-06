import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FaultService } from 'src/app/services/fault.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import 'datatables.net-buttons-bs';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.html5.min';
@Component({
  selector: 'app-bericht',
  templateUrl: './bericht.component.html',
  styleUrls: ['./bericht.component.css']
})
export class BerichtComponent implements OnInit {
  faults: any = []
  faultTypes: any = []

  table: any;
  dataTable: any;
  alertObject: any;

  settings: any = {
    dom: 'Bfrtip',
    buttons: [
      // { extend: 'copyHtml5', className: 'btn-secondary' },
      // { extend: 'excelHtml5', className: 'btn-default' },
      { extend: 'csvHtml5', className: 'btn-dark' }
  ],
  }

  public form: FormGroup = new FormGroup({})

  constructor(private router: Router, private faultService: FaultService, private chaRef: ChangeDetectorRef) {

    this.table = $('table')


    this.dataTable = this.table.DataTable({
      "scrollX": true,
      "retrieve": true,
    })
  }

  ngOnInit(): void {

    this.alertObject = window.alert

    window.alert = (msg) => {
      console.log(msg)
    }

    this.faultService.getFaultTypes().subscribe((data: any) => {
      // console.log(data)
      this.faultTypes = data.extra;
    })

    this.form = new FormGroup({
      Type: new FormControl('', [
        Validators.required
      ]),
      StartDate: new FormControl('', [
        Validators.required
      ]),
      EndDate: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnDestroy(): void {

    window.alert = this.alertObject
  }

  goToEdit(id: number) {
    this.router.navigate(['/edit-message', id]);
  }

  onSubmit() {

    console.log('test')

    this.faultService.getHistoryWithParams(this.form.value).subscribe((data: any) => {
      // console.log(data)

      $('table').DataTable({

      }).destroy()

      this.faults = data.extra
      this.chaRef.detectChanges()

      $('table').DataTable(this.settings).draw();

    })
  }
}
