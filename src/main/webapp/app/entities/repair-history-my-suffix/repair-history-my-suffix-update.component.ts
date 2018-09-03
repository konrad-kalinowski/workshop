import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';
import { RepairHistoryMySuffixService } from './repair-history-my-suffix.service';
import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { VehicleMySuffixService } from 'app/entities/vehicle-my-suffix';

@Component({
    selector: 'jhi-repair-history-my-suffix-update',
    templateUrl: './repair-history-my-suffix-update.component.html'
})
export class RepairHistoryMySuffixUpdateComponent implements OnInit {
    private _repairHistory: IRepairHistoryMySuffix;
    isSaving: boolean;

    vehicles: IVehicleMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private repairHistoryService: RepairHistoryMySuffixService,
        private vehicleService: VehicleMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ repairHistory }) => {
            this.repairHistory = repairHistory;
        });
        this.vehicleService.query({ filter: 'repairhistory-is-null' }).subscribe(
            (res: HttpResponse<IVehicleMySuffix[]>) => {
                if (!this.repairHistory.vehicleId) {
                    this.vehicles = res.body;
                } else {
                    this.vehicleService.find(this.repairHistory.vehicleId).subscribe(
                        (subRes: HttpResponse<IVehicleMySuffix>) => {
                            this.vehicles = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.repairHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.repairHistoryService.update(this.repairHistory));
        } else {
            this.subscribeToSaveResponse(this.repairHistoryService.create(this.repairHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRepairHistoryMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IRepairHistoryMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackVehicleById(index: number, item: IVehicleMySuffix) {
        return item.id;
    }
    get repairHistory() {
        return this._repairHistory;
    }

    set repairHistory(repairHistory: IRepairHistoryMySuffix) {
        this._repairHistory = repairHistory;
    }
}
