import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';
import { RepairHistoryMySuffixService } from './repair-history-my-suffix.service';
import { RepairHistoryMySuffixComponent } from './repair-history-my-suffix.component';
import { RepairHistoryMySuffixDetailComponent } from './repair-history-my-suffix-detail.component';
import { RepairHistoryMySuffixUpdateComponent } from './repair-history-my-suffix-update.component';
import { RepairHistoryMySuffixDeletePopupComponent } from './repair-history-my-suffix-delete-dialog.component';
import { IRepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class RepairHistoryMySuffixResolve implements Resolve<IRepairHistoryMySuffix> {
    constructor(private service: RepairHistoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((repairHistory: HttpResponse<RepairHistoryMySuffix>) => repairHistory.body));
        }
        return of(new RepairHistoryMySuffix());
    }
}

export const repairHistoryRoute: Routes = [
    {
        path: 'repair-history-my-suffix',
        component: RepairHistoryMySuffixComponent,
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
        path: 'repair-history-my-suffix/:id/view',
        component: RepairHistoryMySuffixDetailComponent,
        resolve: {
            repairHistory: RepairHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-history-my-suffix/new',
        component: RepairHistoryMySuffixUpdateComponent,
        resolve: {
            repairHistory: RepairHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-history-my-suffix/:id/edit',
        component: RepairHistoryMySuffixUpdateComponent,
        resolve: {
            repairHistory: RepairHistoryMySuffixResolve
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
        path: 'repair-history-my-suffix/:id/delete',
        component: RepairHistoryMySuffixDeletePopupComponent,
        resolve: {
            repairHistory: RepairHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repairHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
