import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartMySuffix } from 'app/shared/model/part-my-suffix.model';

@Component({
    selector: 'jhi-part-my-suffix-detail',
    templateUrl: './part-my-suffix-detail.component.html'
})
export class PartMySuffixDetailComponent implements OnInit {
    part: IPartMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ part }) => {
            this.part = part;
        });
    }

    previousState() {
        window.history.back();
    }
}
