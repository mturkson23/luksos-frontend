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
  channelSelectedItems: any = [];
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

  msToTime(ms: number) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (parseInt(seconds) < 60) return seconds + " s";
    else if (parseInt(minutes) < 60) return minutes + " min";
    else if (parseInt(hours) < 24) return hours + " h";
    else return days + " Days";
  }

  minToTime(mins: number) {
    let hours = (mins / (60)).toFixed(1);
    let days = (mins / (60 * 24)).toFixed(1);
    if (mins < 60) return mins + " min";
    else if (parseInt(hours) < 24) return hours + " h";
    else return days + " Days";
  }

  ngOnInit(): void {
    this.channelSelectedItems = [];

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
      logs: new FormControl(0, []),
      channelType: new FormControl('', [])
    });

    this.form.disable()

    const remark = this.form.get('resolution_remark')
    if(remark) {
      remark.enable()
    }

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
      console.log('Log::fault data::',data);
      this.faultData = data.extra;

      this.pageTitle = `Meldung ${this.id} "${this.faultData.title}" ${this.faultData.reported_date}`;
      this.reportedBy = this.faultData.reported_by;
      this.resolvedBy = this.faultData.resolved_by;

      const actualDuration = this.msToTime(new Date(this.faultData.resolved_date).valueOf() - new Date(this.faultData.reported_date).valueOf())

      this.form.patchValue({
        title: this.faultData.title,
        reported_date: this.faultData.reported_date,
        closed_date: this.faultData.resolved_date,
        ticket_number: this.faultData.external_code,
        message: this.faultData.message,
        resolution_remark: this.faultData.remark,
        expected_duration: this.minToTime(this.faultData.duration),
        actual_duration: actualDuration,
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
    this.router.navigate(['/history']);
  }

}
