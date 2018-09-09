import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    RepairHistoryComponent,
    RepairHistoryDetailComponent,
    RepairHistoryUpdateComponent,
    RepairHistoryDeletePopupComponent,
    RepairHistoryDeleteDialogComponent,
    repairHistoryRoute,
    repairHistoryPopupRoute
} from './';

const ENTITY_STATES = [...repairHistoryRoute, ...repairHistoryPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepairHistoryComponent,
        RepairHistoryDetailComponent,
        RepairHistoryUpdateComponent,
        RepairHistoryDeleteDialogComponent,
        RepairHistoryDeletePopupComponent
    ],
    entryComponents: [
        RepairHistoryComponent,
        RepairHistoryUpdateComponent,
        RepairHistoryDeleteDialogComponent,
        RepairHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopRepairHistoryModule {}
