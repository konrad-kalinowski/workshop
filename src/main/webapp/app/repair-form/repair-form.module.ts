import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from '../shared';

import { REPAIR_FORM_ROUTE, RepairFormComponent } from './';

@NgModule({
    imports: [
      WorkshopSharedModule,
      RouterModule.forRoot([ REPAIR_FORM_ROUTE ], { useHash: true })
    ],
    declarations: [
      RepairFormComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopAppRepairFormModule {}
