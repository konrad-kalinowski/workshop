import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepairHistory } from 'app/shared/model/repair-history.model';
import { RepairHistoryService } from './repair-history.service';
import { RepairHistoryComponent } from './repair-history.component';
import { RepairHistoryDetailComponent } from './repair-history-detail.component';
import { RepairHistoryUpdateComponent } from './repair-history-update.component';
import { RepairHistoryDeletePopupComponent } from './repair-history-delete-dialog.component';
import { IRepairHistory } from 'app/shared/model/repair-history.model';

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

export const repairHistoryRoute: Routes = [
    {
        path: 'repair-history',
        component: RepairHistoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-history/:id/view',
        component: RepairHistoryDetailComponent,
        resolve: {
            repairHistory: RepairHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-history/new',
        component: RepairHistoryUpdateComponent,
        resolve: {
            repairHistory: RepairHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-history/:id/edit',
        component: RepairHistoryUpdateComponent,
        resolve: {
            repairHistory: RepairHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const repairHistoryPopupRoute: Routes = [
    {
        path: 'repair-history/:id/delete',
        component: RepairHistoryDeletePopupComponent,
        resolve: {
            repairHistory: RepairHistoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
