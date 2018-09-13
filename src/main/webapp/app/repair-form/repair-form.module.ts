import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { WorkshopSharedModule } from '../shared';

import { REPAIR_FORM_ROUTE, RepairFormComponent } from './';

@NgModule({
  imports: [
    WorkshopSharedModule,
    NgSelectModule, FormsModule,
    RouterModule.forRoot([REPAIR_FORM_ROUTE], { useHash: true })
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
export class WorkshopAppRepairFormModule { }
