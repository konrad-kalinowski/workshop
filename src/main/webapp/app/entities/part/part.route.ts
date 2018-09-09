import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Part } from 'app/shared/model/part.model';
import { PartService } from './part.service';
import { PartComponent } from './part.component';
import { PartDetailComponent } from './part-detail.component';
import { PartUpdateComponent } from './part-update.component';
import { PartDeletePopupComponent } from './part-delete-dialog.component';
import { IPart } from 'app/shared/model/part.model';

@Injectable({ providedIn: 'root' })
export class PartResolve implements Resolve<IPart> {
    constructor(private service: PartService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((part: HttpResponse<Part>) => part.body));
        }
        return of(new Part());
    }
}

export const partRoute: Routes = [
    {
        path: 'part',
        component: PartComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'part/:id/view',
        component: PartDetailComponent,
        resolve: {
            part: PartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'part/new',
        component: PartUpdateComponent,
        resolve: {
            part: PartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'part/:id/edit',
        component: PartUpdateComponent,
        resolve: {
            part: PartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partPopupRoute: Routes = [
    {
        path: 'part/:id/delete',
        component: PartDeletePopupComponent,
        resolve: {
            part: PartResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
