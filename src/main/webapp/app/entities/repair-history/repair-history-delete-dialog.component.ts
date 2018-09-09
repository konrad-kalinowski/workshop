import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepairHistory } from 'app/shared/model/repair-history.model';
import { RepairHistoryService } from './repair-history.service';

@Component({
    selector: 'jhi-repair-history-delete-dialog',
    templateUrl: './repair-history-delete-dialog.component.html'
})
export class RepairHistoryDeleteDialogComponent {
    repairHistory: IRepairHistory;

    constructor(
        private repairHistoryService: RepairHistoryService,
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
    selector: 'jhi-repair-history-delete-popup',
    template: ''
})
export class RepairHistoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ repairHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RepairHistoryDeleteDialogComponent as Component, {
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
