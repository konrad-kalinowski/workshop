import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IRepair } from 'app/shared/model/repair.model';
import { RepairService } from './repair.service';
import { IRepairHistory } from 'app/shared/model/repair-history.model';
import { RepairHistoryService } from 'app/entities/repair-history';

@Component({
    selector: 'jhi-repair-update',
    templateUrl: './repair-update.component.html'
})
export class RepairUpdateComponent implements OnInit {
    private _repair: IRepair;
    isSaving: boolean;

    repairhistories: IRepairHistory[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private repairService: RepairService,
        private repairHistoryService: RepairHistoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ repair }) => {
            this.repair = repair;
        });
        this.repairHistoryService.query().subscribe(
            (res: HttpResponse<IRepairHistory[]>) => {
                this.repairhistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.repair.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.repair.id !== undefined) {
            this.subscribeToSaveResponse(this.repairService.update(this.repair));
        } else {
            this.subscribeToSaveResponse(this.repairService.create(this.repair));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRepair>>) {
        result.subscribe((res: HttpResponse<IRepair>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRepairHistoryById(index: number, item: IRepairHistory) {
        return item.id;
    }
    get repair() {
        return this._repair;
    }

    set repair(repair: IRepair) {
        this._repair = repair;
        this.date = moment(repair.date).format(DATE_TIME_FORMAT);
    }
}
