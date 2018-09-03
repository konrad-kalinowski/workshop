import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    RepairHistoryMySuffixComponent,
    RepairHistoryMySuffixDetailComponent,
    RepairHistoryMySuffixUpdateComponent,
    RepairHistoryMySuffixDeletePopupComponent,
    RepairHistoryMySuffixDeleteDialogComponent,
    repairHistoryRoute,
    repairHistoryPopupRoute
} from './';

const ENTITY_STATES = [...repairHistoryRoute, ...repairHistoryPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RepairHistoryMySuffixComponent,
        RepairHistoryMySuffixDetailComponent,
        RepairHistoryMySuffixUpdateComponent,
        RepairHistoryMySuffixDeleteDialogComponent,
        RepairHistoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        RepairHistoryMySuffixComponent,
        RepairHistoryMySuffixUpdateComponent,
        RepairHistoryMySuffixDeleteDialogComponent,
        RepairHistoryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopRepairHistoryMySuffixModule {}
