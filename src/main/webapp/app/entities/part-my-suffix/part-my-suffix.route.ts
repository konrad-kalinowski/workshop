import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartMySuffix } from 'app/shared/model/part-my-suffix.model';
import { PartMySuffixService } from './part-my-suffix.service';
import { PartMySuffixComponent } from './part-my-suffix.component';
import { PartMySuffixDetailComponent } from './part-my-suffix-detail.component';
import { PartMySuffixUpdateComponent } from './part-my-suffix-update.component';
import { PartMySuffixDeletePopupComponent } from './part-my-suffix-delete-dialog.component';
import { IPartMySuffix } from 'app/shared/model/part-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PartMySuffixResolve implements Resolve<IPartMySuffix> {
    constructor(private service: PartMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((part: HttpResponse<PartMySuffix>) => part.body));
        }
        return of(new PartMySuffix());
    }
}

export const partRoute: Routes = [
    {
        path: 'part-my-suffix',
        component: PartMySuffixComponent,
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
        path: 'part-my-suffix/:id/view',
        component: PartMySuffixDetailComponent,
        resolve: {
            part: PartMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'part-my-suffix/new',
        component: PartMySuffixUpdateComponent,
        resolve: {
            part: PartMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'part-my-suffix/:id/edit',
        component: PartMySuffixUpdateComponent,
        resolve: {
            part: PartMySuffixResolve
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
        path: 'part-my-suffix/:id/delete',
        component: PartMySuffixDeletePopupComponent,
        resolve: {
            part: PartMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.part.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
