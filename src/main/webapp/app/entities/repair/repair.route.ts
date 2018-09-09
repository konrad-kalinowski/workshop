import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repair } from 'app/shared/model/repair.model';
import { RepairService } from './repair.service';
import { RepairComponent } from './repair.component';
import { RepairDetailComponent } from './repair-detail.component';
import { RepairUpdateComponent } from './repair-update.component';
import { RepairDeletePopupComponent } from './repair-delete-dialog.component';
import { IRepair } from 'app/shared/model/repair.model';

@Injectable({ providedIn: 'root' })
export class RepairResolve implements Resolve<IRepair> {
    constructor(private service: RepairService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((repair: HttpResponse<Repair>) => repair.body));
        }
        return of(new Repair());
    }
}

export const repairRoute: Routes = [
    {
        path: 'repair',
        component: RepairComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair/:id/view',
        component: RepairDetailComponent,
        resolve: {
            repair: RepairResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair/new',
        component: RepairUpdateComponent,
        resolve: {
            repair: RepairResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair/:id/edit',
        component: RepairUpdateComponent,
        resolve: {
            repair: RepairResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const repairPopupRoute: Routes = [
    {
        path: 'repair/:id/delete',
        component: RepairDeletePopupComponent,
        resolve: {
            repair: RepairResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
