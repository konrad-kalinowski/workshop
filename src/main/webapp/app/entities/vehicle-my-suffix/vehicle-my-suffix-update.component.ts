import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { VehicleMySuffixService } from './vehicle-my-suffix.service';
import { IOwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';
import { OwnerMySuffixService } from 'app/entities/owner-my-suffix';

@Component({
    selector: 'jhi-vehicle-my-suffix-update',
    templateUrl: './vehicle-my-suffix-update.component.html'
})
export class VehicleMySuffixUpdateComponent implements OnInit {
    private _vehicle: IVehicleMySuffix;
    isSaving: boolean;

    owners: IOwnerMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private vehicleService: VehicleMySuffixService,
        private ownerService: OwnerMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
        this.ownerService.query().subscribe(
            (res: HttpResponse<IOwnerMySuffix[]>) => {
                this.owners = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vehicle.id !== undefined) {
            this.subscribeToSaveResponse(this.vehicleService.update(this.vehicle));
        } else {
            this.subscribeToSaveResponse(this.vehicleService.create(this.vehicle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleMySuffix>>) {
        result.subscribe((res: HttpResponse<IVehicleMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOwnerById(index: number, item: IOwnerMySuffix) {
        return item.id;
    }
    get vehicle() {
        return this._vehicle;
    }

    set vehicle(vehicle: IVehicleMySuffix) {
        this._vehicle = vehicle;
    }
}
