import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    PartComponent,
    PartDetailComponent,
    PartUpdateComponent,
    PartDeletePopupComponent,
    PartDeleteDialogComponent,
    partRoute,
    partPopupRoute
} from './';

const ENTITY_STATES = [...partRoute, ...partPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PartComponent, PartDetailComponent, PartUpdateComponent, PartDeleteDialogComponent, PartDeletePopupComponent],
    entryComponents: [PartComponent, PartUpdateComponent, PartDeleteDialogComponent, PartDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopPartModule {}
