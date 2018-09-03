import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';
import { OwnerMySuffixService } from './owner-my-suffix.service';

@Component({
    selector: 'jhi-owner-my-suffix-delete-dialog',
    templateUrl: './owner-my-suffix-delete-dialog.component.html'
})
export class OwnerMySuffixDeleteDialogComponent {
    owner: IOwnerMySuffix;

    constructor(private ownerService: OwnerMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ownerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ownerListModification',
                content: 'Deleted an owner'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-owner-my-suffix-delete-popup',
    template: ''
})
export class OwnerMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ owner }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OwnerMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.owner = owner;
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
