import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { RepairHistoryReportComponent } from './';
import { Injectable } from '@angular/core';
import { RepairService } from 'app/entities/repair';
import { IRepair, Repair } from 'app/shared/model/repair.model';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiResolvePagingParams } from 'ng-jhipster';


@Injectable({ providedIn: 'root' })
export class RepairResolve implements Resolve<IRepair> {
  constructor(private service: RepairService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(map((repair: HttpResponse<Repair>) => repair.body));
    }
    return of(new Repair());
  }
}

export const REPAIR_HISTORY_REPORT_ROUTE: Route = {
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
};
