import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { VehicleMySuffixService } from './vehicle-my-suffix.service';

@Component({
    selector: 'jhi-vehicle-my-suffix-delete-dialog',
    templateUrl: './vehicle-my-suffix-delete-dialog.component.html'
})
export class VehicleMySuffixDeleteDialogComponent {
    vehicle: IVehicleMySuffix;

    constructor(
        private vehicleService: VehicleMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleListModification',
                content: 'Deleted an vehicle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-my-suffix-delete-popup',
    template: ''
})
export class VehicleMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VehicleMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vehicle = vehicle;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
