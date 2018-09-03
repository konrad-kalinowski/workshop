import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepairMySuffix } from 'app/shared/model/repair-my-suffix.model';
import { RepairMySuffixService } from './repair-my-suffix.service';

@Component({
    selector: 'jhi-repair-my-suffix-delete-dialog',
    templateUrl: './repair-my-suffix-delete-dialog.component.html'
})
export class RepairMySuffixDeleteDialogComponent {
    repair: IRepairMySuffix;

    constructor(private repairService: RepairMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.repairService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'repairListModification',
                content: 'Deleted an repair'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-repair-my-suffix-delete-popup',
    template: ''
})
export class RepairMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repair }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RepairMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.repair = repair;
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
