import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaultService } from 'src/app/services/fault.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dropdownList: any = []
  selectedItems: any = []
  dropdownSettings: any = {}

  id: any
  faultData: any = {}
  pageTitle: string=''
  reportedBy: string=''
  resolvedBy: string=''

  logs: any = []

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private faultService: FaultService,
    private activatedRoute: ActivatedRoute
  ) {}

  public form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      reported_date: new FormControl('', []),
      closed_date: new FormControl('', []),
      ticket_number: new FormControl('', []),
      message: new FormControl('', []),
      resolution_remark: new FormControl('', []),
      expected_duration: new FormControl('', []),
      actual_duration: new FormControl('', []),
      logs: new FormControl(0, [])
    });

    this.dropdownList = [
      // { item_id: 1, item_text: 'Mumbai' },
      // { item_id: 2, item_text: 'Bangaluru' },
    ];
    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
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

    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    this.faultService.getResolutionByFaultId(parseInt(this.id)).subscribe((data: any) => {
      console.log(data);
      this.faultData = data.extra;

      this.pageTitle = `Meldung ${this.id} "${this.faultData.title}" ${this.faultData.reported_date}`;
      this.reportedBy = this.faultData.reported_by;
      this.resolvedBy = this.faultData.resolved_by;

      this.form.patchValue({
        title: this.faultData.title,
        reported_date: this.faultData.reported_date,
        closed_date: this.faultData.resolved_date,
        ticket_number: this.faultData.external_code,
        message: this.faultData.message,
        resolution_remark: this.faultData.remark,
        expected_duration: this.faultData.duration,
        actual_duration: this.faultData.actual_duration, // replace with the difference in minutes between when it was reported and when the resolution was created
      })

      this.faultService.getLogsByFaultId(parseInt(this.id)).subscribe((data: any) => {

        console.log(data);
        this.logs = data.extra;

        this.form.patchValue({
          logs: this.logs.length
        })
      })
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  openModal(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
