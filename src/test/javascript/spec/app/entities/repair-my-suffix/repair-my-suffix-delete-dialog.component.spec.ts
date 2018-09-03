/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkshopTestModule } from '../../../test.module';
import { RepairMySuffixDeleteDialogComponent } from 'app/entities/repair-my-suffix/repair-my-suffix-delete-dialog.component';
import { RepairMySuffixService } from 'app/entities/repair-my-suffix/repair-my-suffix.service';

describe('Component Tests', () => {
    describe('RepairMySuffix Management Delete Component', () => {
        let comp: RepairMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RepairMySuffixDeleteDialogComponent>;
        let service: RepairMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(RepairMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepairMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairMySuffixService);
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
