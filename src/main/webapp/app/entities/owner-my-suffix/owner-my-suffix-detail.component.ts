import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';

@Component({
    selector: 'jhi-owner-my-suffix-detail',
    templateUrl: './owner-my-suffix-detail.component.html'
})
export class OwnerMySuffixDetailComponent implements OnInit {
    owner: IOwnerMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ owner }) => {
            this.owner = owner;
        });
    }

    previousState() {
        window.history.back();
    }
}
