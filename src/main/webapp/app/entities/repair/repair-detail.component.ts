import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepair } from 'app/shared/model/repair.model';

@Component({
    selector: 'jhi-repair-detail',
    templateUrl: './repair-detail.component.html'
})
export class RepairDetailComponent implements OnInit {
    repair: IRepair;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repair }) => {
            this.repair = repair;
        });
    }

    previousState() {
        window.history.back();
    }
}
