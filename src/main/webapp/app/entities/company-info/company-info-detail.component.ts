import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyInfo } from 'app/shared/model/company-info.model';

@Component({
    selector: 'jhi-company-info-detail',
    templateUrl: './company-info-detail.component.html'
})
export class CompanyInfoDetailComponent implements OnInit {
    companyInfo: ICompanyInfo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyInfo }) => {
            this.companyInfo = companyInfo;
        });
    }

    previousState() {
        window.history.back();
    }
}
