import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPart } from 'app/shared/model/part.model';
import { PartService } from './part.service';
import { IRepair } from 'app/shared/model/repair.model';
import { RepairService } from 'app/entities/repair';

@Component({
    selector: 'jhi-part-update',
    templateUrl: './part-update.component.html'
})
export class PartUpdateComponent implements OnInit {
    private _part: IPart;
    isSaving: boolean;

    repairs: IRepair[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private partService: PartService,
        private repairService: RepairService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ part }) => {
            this.part = part;
        });
        this.repairService.query().subscribe(
            (res: HttpResponse<IRepair[]>) => {
                this.repairs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.part.id !== undefined) {
            this.subscribeToSaveResponse(this.partService.update(this.part));
        } else {
            this.subscribeToSaveResponse(this.partService.create(this.part));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPart>>) {
        result.subscribe((res: HttpResponse<IPart>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRepairById(index: number, item: IRepair) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get part() {
        return this._part;
    }

    set part(part: IPart) {
        this._part = part;
    }
}
