import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRepairHistory } from 'app/shared/model/repair-history.model';
import { RepairHistoryService } from './repair-history.service';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { VehicleService } from 'app/entities/vehicle';

@Component({
    selector: 'jhi-repair-history-update',
    templateUrl: './repair-history-update.component.html'
})
export class RepairHistoryUpdateComponent implements OnInit {
    private _repairHistory: IRepairHistory;
    isSaving: boolean;

    vehicles: IVehicle[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private repairHistoryService: RepairHistoryService,
        private vehicleService: VehicleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ repairHistory }) => {
            this.repairHistory = repairHistory;
        });
        this.vehicleService.query({ filter: 'history-is-null' }).subscribe(
            (res: HttpResponse<IVehicle[]>) => {
                if (!this.repairHistory.vehicle) {
                    this.vehicles = res.body;
                } else {
                    this.vehicleService.find(this.repairHistory.vehicle).subscribe(
                        (subRes: HttpResponse<IVehicle>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRepairHistory>>) {
        result.subscribe((res: HttpResponse<IRepairHistory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVehicleById(index: number, item: IVehicle) {
        return item.id;
    }
    get repairHistory() {
        return this._repairHistory;
    }

    set repairHistory(repairHistory: IRepairHistory) {
        this._repairHistory = repairHistory;
    }
}
