import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';

@Component({
    selector: 'jhi-vehicle-my-suffix-detail',
    templateUrl: './vehicle-my-suffix-detail.component.html'
})
export class VehicleMySuffixDetailComponent implements OnInit {
    vehicle: IVehicleMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
    }

    previousState() {
        window.history.back();
    }
}
