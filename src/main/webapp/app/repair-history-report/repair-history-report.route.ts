import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { RepairHistoryReportComponent } from './';
import { Injectable } from '@angular/core';
import { RepairService } from 'app/entities/repair';
import { IRepair, Repair } from 'app/shared/model/repair.model';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { OwnersRepairComponent } from 'app/repair-history-report/owners-repair.component';
import { RepairHistoryService } from 'app/entities/repair-history';
import { IRepairHistory, RepairHistory } from 'app/shared/model/repair-history.model';

@Injectable({ providedIn: 'root' })
export class RepairHistoryResolve implements Resolve<IRepairHistory> {
    constructor(private service: RepairHistoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((repairHistory: HttpResponse<RepairHistory>) => repairHistory.body));
        }
        return of(new RepairHistory());
    }
}

export const REPAIR_HISTORY_REPORT_ROUTE: Routes = [
  {
    path: 'repair-history-report',
    component: RepairHistoryReportComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'repair-history-report.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'repair-history-report/:id',
    component: OwnersRepairComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
      repairHistory: RepairHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'repair-history-report.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
