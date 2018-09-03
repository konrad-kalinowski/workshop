import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    OwnerMySuffixComponent,
    OwnerMySuffixDetailComponent,
    OwnerMySuffixUpdateComponent,
    OwnerMySuffixDeletePopupComponent,
    OwnerMySuffixDeleteDialogComponent,
    ownerRoute,
    ownerPopupRoute
} from './';

const ENTITY_STATES = [...ownerRoute, ...ownerPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OwnerMySuffixComponent,
        OwnerMySuffixDetailComponent,
        OwnerMySuffixUpdateComponent,
        OwnerMySuffixDeleteDialogComponent,
        OwnerMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OwnerMySuffixComponent,
        OwnerMySuffixUpdateComponent,
        OwnerMySuffixDeleteDialogComponent,
        OwnerMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopOwnerMySuffixModule {}
