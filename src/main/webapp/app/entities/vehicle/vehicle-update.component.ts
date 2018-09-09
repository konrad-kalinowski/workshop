import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVehicle } from 'app/shared/model/vehicle.model';
import { VehicleService } from './vehicle.service';
import { IOwner } from 'app/shared/model/owner.model';
import { OwnerService } from 'app/entities/owner';

@Component({
    selector: 'jhi-vehicle-update',
    templateUrl: './vehicle-update.component.html'
})
export class VehicleUpdateComponent implements OnInit {
    private _vehicle: IVehicle;
    isSaving: boolean;

    owners: IOwner[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private vehicleService: VehicleService,
        private ownerService: OwnerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
        this.ownerService.query().subscribe(
            (res: HttpResponse<IOwner[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVehicle>>) {
        result.subscribe((res: HttpResponse<IVehicle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOwnerById(index: number, item: IOwner) {
        return item.id;
    }
    get vehicle() {
        return this._vehicle;
    }

    set vehicle(vehicle: IVehicle) {
        this._vehicle = vehicle;
    }
}
