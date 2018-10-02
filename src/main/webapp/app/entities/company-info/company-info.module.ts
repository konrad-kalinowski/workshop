import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from 'app/shared';
import {
    CompanyInfoComponent,
    CompanyInfoDetailComponent,
    CompanyInfoUpdateComponent,
    CompanyInfoDeletePopupComponent,
    CompanyInfoDeleteDialogComponent,
    companyInfoRoute,
    companyInfoPopupRoute
} from './';

const ENTITY_STATES = [...companyInfoRoute, ...companyInfoPopupRoute];

@NgModule({
    imports: [WorkshopSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyInfoComponent,
        CompanyInfoDetailComponent,
        CompanyInfoUpdateComponent,
        CompanyInfoDeleteDialogComponent,
        CompanyInfoDeletePopupComponent
    ],
    entryComponents: [CompanyInfoComponent, CompanyInfoUpdateComponent, CompanyInfoDeleteDialogComponent, CompanyInfoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopCompanyInfoModule {}
