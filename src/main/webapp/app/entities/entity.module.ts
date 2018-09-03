import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WorkshopOwnerMySuffixModule } from './owner-my-suffix/owner-my-suffix.module';
import { WorkshopVehicleMySuffixModule } from './vehicle-my-suffix/vehicle-my-suffix.module';
import { WorkshopTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { WorkshopPartMySuffixModule } from './part-my-suffix/part-my-suffix.module';
import { WorkshopRepairMySuffixModule } from './repair-my-suffix/repair-my-suffix.module';
import { WorkshopRepairHistoryMySuffixModule } from './repair-history-my-suffix/repair-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WorkshopOwnerMySuffixModule,
        WorkshopVehicleMySuffixModule,
        WorkshopTaskMySuffixModule,
        WorkshopPartMySuffixModule,
        WorkshopRepairMySuffixModule,
        WorkshopRepairHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopEntityModule {}
