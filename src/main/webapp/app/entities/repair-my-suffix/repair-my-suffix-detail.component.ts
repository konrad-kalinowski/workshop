import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepairMySuffix } from 'app/shared/model/repair-my-suffix.model';

@Component({
    selector: 'jhi-repair-my-suffix-detail',
    templateUrl: './repair-my-suffix-detail.component.html'
})
export class RepairMySuffixDetailComponent implements OnInit {
    repair: IRepairMySuffix;

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
