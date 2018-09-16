import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from '../shared';

import { REPAIR_HISTORY_REPORT_ROUTE, RepairHistoryReportComponent } from './';

@NgModule({
    imports: [
      WorkshopSharedModule,
      RouterModule.forRoot([ REPAIR_HISTORY_REPORT_ROUTE ], { useHash: true })
    ],
    declarations: [
      RepairHistoryReportComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopAppRepairHistoryReportModule {}
