import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    PartMySuffixComponent,
    PartMySuffixDetailComponent,
    PartMySuffixUpdateComponent,
    PartMySuffixDeletePopupComponent,
    PartMySuffixDeleteDialogComponent,
    partRoute,
    partPopupRoute
} from './';

const ENTITY_STATES = [...partRoute, ...partPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PartMySuffixComponent,
        PartMySuffixDetailComponent,
        PartMySuffixUpdateComponent,
        PartMySuffixDeleteDialogComponent,
        PartMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PartMySuffixComponent,
        PartMySuffixUpdateComponent,
        PartMySuffixDeleteDialogComponent,
        PartMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopPartMySuffixModule {}
