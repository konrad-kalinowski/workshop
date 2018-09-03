import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    VehicleMySuffixComponent,
    VehicleMySuffixDetailComponent,
    VehicleMySuffixUpdateComponent,
    VehicleMySuffixDeletePopupComponent,
    VehicleMySuffixDeleteDialogComponent,
    vehicleRoute,
    vehiclePopupRoute
} from './';

const ENTITY_STATES = [...vehicleRoute, ...vehiclePopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VehicleMySuffixComponent,
        VehicleMySuffixDetailComponent,
        VehicleMySuffixUpdateComponent,
        VehicleMySuffixDeleteDialogComponent,
        VehicleMySuffixDeletePopupComponent
    ],
    entryComponents: [
        VehicleMySuffixComponent,
        VehicleMySuffixUpdateComponent,
        VehicleMySuffixDeleteDialogComponent,
        VehicleMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopVehicleMySuffixModule {}
