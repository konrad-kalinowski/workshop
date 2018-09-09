import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepairHistory } from 'app/shared/model/repair-history.model';

@Component({
    selector: 'jhi-repair-history-detail',
    templateUrl: './repair-history-detail.component.html'
})
export class RepairHistoryDetailComponent implements OnInit {
    repairHistory: IRepairHistory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repairHistory }) => {
            this.repairHistory = repairHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
