import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';
import { OwnerMySuffixService } from './owner-my-suffix.service';
import { OwnerMySuffixComponent } from './owner-my-suffix.component';
import { OwnerMySuffixDetailComponent } from './owner-my-suffix-detail.component';
import { OwnerMySuffixUpdateComponent } from './owner-my-suffix-update.component';
import { OwnerMySuffixDeletePopupComponent } from './owner-my-suffix-delete-dialog.component';
import { IOwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OwnerMySuffixResolve implements Resolve<IOwnerMySuffix> {
    constructor(private service: OwnerMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((owner: HttpResponse<OwnerMySuffix>) => owner.body));
        }
        return of(new OwnerMySuffix());
    }
}

export const ownerRoute: Routes = [
    {
        path: 'owner-my-suffix',
        component: OwnerMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workshopApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'owner-my-suffix/:id/view',
        component: OwnerMySuffixDetailComponent,
        resolve: {
            owner: OwnerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'owner-my-suffix/new',
        component: OwnerMySuffixUpdateComponent,
        resolve: {
            owner: OwnerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'owner-my-suffix/:id/edit',
        component: OwnerMySuffixUpdateComponent,
        resolve: {
            owner: OwnerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ownerPopupRoute: Routes = [
    {
        path: 'owner-my-suffix/:id/delete',
        component: OwnerMySuffixDeletePopupComponent,
        resolve: {
            owner: OwnerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.owner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
