import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    RepairComponent,
    RepairDetailComponent,
    RepairUpdateComponent,
    RepairDeletePopupComponent,
    RepairDeleteDialogComponent,
    repairRoute,
    repairPopupRoute
} from './';

const ENTITY_STATES = [...repairRoute, ...repairPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RepairComponent, RepairDetailComponent, RepairUpdateComponent, RepairDeleteDialogComponent, RepairDeletePopupComponent],
    entryComponents: [RepairComponent, RepairUpdateComponent, RepairDeleteDialogComponent, RepairDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopRepairModule { }
