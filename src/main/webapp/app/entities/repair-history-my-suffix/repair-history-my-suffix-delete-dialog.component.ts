import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';
import { RepairHistoryMySuffixService } from './repair-history-my-suffix.service';

@Component({
    selector: 'jhi-repair-history-my-suffix-delete-dialog',
    templateUrl: './repair-history-my-suffix-delete-dialog.component.html'
})
export class RepairHistoryMySuffixDeleteDialogComponent {
    repairHistory: IRepairHistoryMySuffix;

    constructor(
        private repairHistoryService: RepairHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.repairHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'repairHistoryListModification',
                content: 'Deleted an repairHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-repair-history-my-suffix-delete-popup',
    template: ''
})
export class RepairHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repairHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RepairHistoryMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.repairHistory = repairHistory;
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
