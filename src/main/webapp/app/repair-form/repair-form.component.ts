import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-repair-form',
  templateUrl: './repair-form.component.html',
  styleUrls: [
    'repair-form.scss'
  ]
})
export class RepairFormComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'RepairFormComponent message';
  }

  ngOnInit() {
  }

}
