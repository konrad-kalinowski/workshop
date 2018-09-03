import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';

@Component({
    selector: 'jhi-repair-history-my-suffix-detail',
    templateUrl: './repair-history-my-suffix-detail.component.html'
})
export class RepairHistoryMySuffixDetailComponent implements OnInit {
    repairHistory: IRepairHistoryMySuffix;

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
