import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartMySuffix } from 'app/shared/model/part-my-suffix.model';
import { PartMySuffixService } from './part-my-suffix.service';

@Component({
    selector: 'jhi-part-my-suffix-delete-dialog',
    templateUrl: './part-my-suffix-delete-dialog.component.html'
})
export class PartMySuffixDeleteDialogComponent {
    part: IPartMySuffix;

    constructor(private partService: PartMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.partService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'partListModification',
                content: 'Deleted an part'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-part-my-suffix-delete-popup',
    template: ''
})
export class PartMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ part }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PartMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.part = part;
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
