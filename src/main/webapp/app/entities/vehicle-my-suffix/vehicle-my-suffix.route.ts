import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { VehicleMySuffixService } from './vehicle-my-suffix.service';
import { VehicleMySuffixComponent } from './vehicle-my-suffix.component';
import { VehicleMySuffixDetailComponent } from './vehicle-my-suffix-detail.component';
import { VehicleMySuffixUpdateComponent } from './vehicle-my-suffix-update.component';
import { VehicleMySuffixDeletePopupComponent } from './vehicle-my-suffix-delete-dialog.component';
import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class VehicleMySuffixResolve implements Resolve<IVehicleMySuffix> {
    constructor(private service: VehicleMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((vehicle: HttpResponse<VehicleMySuffix>) => vehicle.body));
        }
        return of(new VehicleMySuffix());
    }
}

export const vehicleRoute: Routes = [
    {
        path: 'vehicle-my-suffix',
        component: VehicleMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workshopApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vehicle-my-suffix/:id/view',
        component: VehicleMySuffixDetailComponent,
        resolve: {
            vehicle: VehicleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vehicle-my-suffix/new',
        component: VehicleMySuffixUpdateComponent,
        resolve: {
            vehicle: VehicleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vehicle-my-suffix/:id/edit',
        component: VehicleMySuffixUpdateComponent,
        resolve: {
            vehicle: VehicleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehiclePopupRoute: Routes = [
    {
        path: 'vehicle-my-suffix/:id/delete',
        component: VehicleMySuffixDeletePopupComponent,
        resolve: {
            vehicle: VehicleMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workshopApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
