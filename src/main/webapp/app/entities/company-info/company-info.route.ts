import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyInfo } from 'app/shared/model/company-info.model';
import { CompanyInfoService } from './company-info.service';
import { CompanyInfoComponent } from './company-info.component';
import { CompanyInfoDetailComponent } from './company-info-detail.component';
import { CompanyInfoUpdateComponent } from './company-info-update.component';
import { CompanyInfoDeletePopupComponent } from './company-info-delete-dialog.component';
import { ICompanyInfo } from 'app/shared/model/company-info.model';

@Injectable({ providedIn: 'root' })
export class CompanyInfoResolve implements Resolve<ICompanyInfo> {
    constructor(private service: CompanyInfoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((companyInfo: HttpResponse<CompanyInfo>) => companyInfo.body));
        }
        return of(new CompanyInfo());
    }
}

export const companyInfoRoute: Routes = [
    {
        path: 'company-info',
        component: CompanyInfoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workshopApp.companyInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-info/:id/view',
        component: CompanyInfoDetailComponent,
        resolve: {
            companyInfo: CompanyInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.companyInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-info/new',
        component: CompanyInfoUpdateComponent,
        resolve: {
            companyInfo: CompanyInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.companyInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-info/:id/edit',
        component: CompanyInfoUpdateComponent,
        resolve: {
            companyInfo: CompanyInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.companyInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyInfoPopupRoute: Routes = [
    {
        path: 'company-info/:id/delete',
        component: CompanyInfoDeletePopupComponent,
        resolve: {
            companyInfo: CompanyInfoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.companyInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
