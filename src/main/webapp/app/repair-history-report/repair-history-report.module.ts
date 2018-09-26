import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopSharedModule } from '../shared';

import { REPAIR_HISTORY_REPORT_ROUTE, RepairHistoryReportComponent } from './';
import { OwnersRepairComponent } from 'app/repair-history-report/owners-repair.component';

@NgModule({
    imports: [
      WorkshopSharedModule,
      RouterModule.forChild(REPAIR_HISTORY_REPORT_ROUTE)
    ],
    declarations: [
      RepairHistoryReportComponent,
      OwnersRepairComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopAppRepairHistoryReportModule {}
