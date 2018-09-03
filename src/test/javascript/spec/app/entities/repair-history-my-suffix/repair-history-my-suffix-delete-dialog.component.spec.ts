/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkshopTestModule } from '../../../test.module';
import { RepairHistoryMySuffixDeleteDialogComponent } from 'app/entities/repair-history-my-suffix/repair-history-my-suffix-delete-dialog.component';
import { RepairHistoryMySuffixService } from 'app/entities/repair-history-my-suffix/repair-history-my-suffix.service';

describe('Component Tests', () => {
    describe('RepairHistoryMySuffix Management Delete Component', () => {
        let comp: RepairHistoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RepairHistoryMySuffixDeleteDialogComponent>;
        let service: RepairHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairHistoryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(RepairHistoryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepairHistoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairHistoryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
