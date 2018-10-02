import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompanyInfo } from 'app/shared/model/company-info.model';
import { CompanyInfoService } from './company-info.service';

@Component({
    selector: 'jhi-company-info-update',
    templateUrl: './company-info-update.component.html'
})
export class CompanyInfoUpdateComponent implements OnInit {
    private _companyInfo: ICompanyInfo;
    isSaving: boolean;

    constructor(private companyInfoService: CompanyInfoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyInfo }) => {
            this.companyInfo = companyInfo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyInfo.id !== undefined) {
            this.subscribeToSaveResponse(this.companyInfoService.update(this.companyInfo));
        } else {
            this.subscribeToSaveResponse(this.companyInfoService.create(this.companyInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyInfo>>) {
        result.subscribe((res: HttpResponse<ICompanyInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get companyInfo() {
        return this._companyInfo;
    }

    set companyInfo(companyInfo: ICompanyInfo) {
        this._companyInfo = companyInfo;
    }
}
