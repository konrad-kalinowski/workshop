import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepairMySuffix } from 'app/shared/model/repair-my-suffix.model';
import { RepairMySuffixService } from './repair-my-suffix.service';
import { RepairMySuffixComponent } from './repair-my-suffix.component';
import { RepairMySuffixDetailComponent } from './repair-my-suffix-detail.component';
import { RepairMySuffixUpdateComponent } from './repair-my-suffix-update.component';
import { RepairMySuffixDeletePopupComponent } from './repair-my-suffix-delete-dialog.component';
import { IRepairMySuffix } from 'app/shared/model/repair-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class RepairMySuffixResolve implements Resolve<IRepairMySuffix> {
    constructor(private service: RepairMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((repair: HttpResponse<RepairMySuffix>) => repair.body));
        }
        return of(new RepairMySuffix());
    }
}

export const repairRoute: Routes = [
    {
        path: 'repair-my-suffix',
        component: RepairMySuffixComponent,
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
        path: 'repair-my-suffix/:id/view',
        component: RepairMySuffixDetailComponent,
        resolve: {
            repair: RepairMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-my-suffix/new',
        component: RepairMySuffixUpdateComponent,
        resolve: {
            repair: RepairMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'repair-my-suffix/:id/edit',
        component: RepairMySuffixUpdateComponent,
        resolve: {
            repair: RepairMySuffixResolve
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
        path: 'repair-my-suffix/:id/delete',
        component: RepairMySuffixDeletePopupComponent,
        resolve: {
            repair: RepairMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.repair.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
