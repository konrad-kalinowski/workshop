/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkshopTestModule } from '../../../test.module';
import { OwnerMySuffixDeleteDialogComponent } from 'app/entities/owner-my-suffix/owner-my-suffix-delete-dialog.component';
import { OwnerMySuffixService } from 'app/entities/owner-my-suffix/owner-my-suffix.service';

describe('Component Tests', () => {
    describe('OwnerMySuffix Management Delete Component', () => {
        let comp: OwnerMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OwnerMySuffixDeleteDialogComponent>;
        let service: OwnerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [OwnerMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(OwnerMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OwnerMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OwnerMySuffixService);
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
