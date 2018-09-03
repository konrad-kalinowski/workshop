import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IRepairMySuffix } from 'app/shared/model/repair-my-suffix.model';
import { RepairMySuffixService } from './repair-my-suffix.service';
import { IRepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';
import { RepairHistoryMySuffixService } from 'app/entities/repair-history-my-suffix';
import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from 'app/entities/task-my-suffix';
import { IPartMySuffix } from 'app/shared/model/part-my-suffix.model';
import { PartMySuffixService } from 'app/entities/part-my-suffix';

@Component({
    selector: 'jhi-repair-my-suffix-update',
    templateUrl: './repair-my-suffix-update.component.html'
})
export class RepairMySuffixUpdateComponent implements OnInit {
    private _repair: IRepairMySuffix;
    isSaving: boolean;

    repairhistories: IRepairHistoryMySuffix[];

    tasks: ITaskMySuffix[];

    parts: IPartMySuffix[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private repairService: RepairMySuffixService,
        private repairHistoryService: RepairHistoryMySuffixService,
        private taskService: TaskMySuffixService,
        private partService: PartMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ repair }) => {
            this.repair = repair;
        });
        this.repairHistoryService.query().subscribe(
            (res: HttpResponse<IRepairHistoryMySuffix[]>) => {
                this.repairhistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITaskMySuffix[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.partService.query().subscribe(
            (res: HttpResponse<IPartMySuffix[]>) => {
                this.parts = res.body;
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRepairMySuffix>>) {
        result.subscribe((res: HttpResponse<IRepairMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRepairHistoryById(index: number, item: IRepairHistoryMySuffix) {
        return item.id;
    }

    trackTaskById(index: number, item: ITaskMySuffix) {
        return item.id;
    }

    trackPartById(index: number, item: IPartMySuffix) {
        return item.id;
    }
    get repair() {
        return this._repair;
    }

    set repair(repair: IRepairMySuffix) {
        this._repair = repair;
        this.date = moment(repair.date).format(DATE_TIME_FORMAT);
    }
}
