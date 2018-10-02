import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WorkshopOwnerModule } from './owner/owner.module';
import { WorkshopVehicleModule } from './vehicle/vehicle.module';
import { WorkshopTaskModule } from './task/task.module';
import { WorkshopPartModule } from './part/part.module';
import { WorkshopRepairModule } from './repair/repair.module';
import { WorkshopRepairHistoryModule } from './repair-history/repair-history.module';
import { WorkshopCompanyInfoModule } from './company-info/company-info.module';
import { WorkshopItemModule } from './item/item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WorkshopOwnerModule,
        WorkshopVehicleModule,
        WorkshopTaskModule,
        WorkshopPartModule,
        WorkshopRepairModule,
        WorkshopRepairHistoryModule,
        WorkshopCompanyInfoModule,
        WorkshopItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkshopEntityModule {}
