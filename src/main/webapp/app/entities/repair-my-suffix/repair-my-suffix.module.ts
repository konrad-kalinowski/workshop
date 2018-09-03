import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    RepairMySuffixComponent,
    RepairMySuffixDetailComponent,
    RepairMySuffixUpdateComponent,
    RepairMySuffixDeletePopupComponent,
    RepairMySuffixDeleteDialogComponent,
    repairRoute,
    repairPopupRoute
} from './';

const ENTITY_STATES = [...repairRoute, ...repairPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepairMySuffixComponent,
        RepairMySuffixDetailComponent,
        RepairMySuffixUpdateComponent,
        RepairMySuffixDeleteDialogComponent,
        RepairMySuffixDeletePopupComponent
    ],
    entryComponents: [
        RepairMySuffixComponent,
        RepairMySuffixUpdateComponent,
        RepairMySuffixDeleteDialogComponent,
        RepairMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopRepairMySuffixModule {}
