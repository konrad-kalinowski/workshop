import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-repair-history-report',
  templateUrl: './repair-history-report.component.html',
  styleUrls: [
    'repair-history-report.scss'
  ]
})
export class RepairHistoryReportComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'RepairHistoryReportComponent message';
  }

  ngOnInit() {
  }

}
