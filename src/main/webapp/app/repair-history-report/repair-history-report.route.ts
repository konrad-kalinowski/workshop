import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { RepairHistoryReportComponent } from './';

export const REPAIR_HISTORY_REPORT_ROUTE: Route = {
  path: 'repair-history-report',
  component: RepairHistoryReportComponent,
  data: {
    authorities: [],
    pageTitle: 'repair-history-report.title'
  },
  canActivate: [UserRouteAccessService]
};
