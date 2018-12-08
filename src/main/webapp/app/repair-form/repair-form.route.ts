import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { RepairFormComponent } from './';

export const REPAIR_FORM_ROUTE: Route = {
    path: 'repair-form',
    component: RepairFormComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'repair-form.title'
    },
    canActivate: [UserRouteAccessService]
};
