/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkshopTestModule } from '../../../test.module';
import { PartMySuffixDeleteDialogComponent } from 'app/entities/part-my-suffix/part-my-suffix-delete-dialog.component';
import { PartMySuffixService } from 'app/entities/part-my-suffix/part-my-suffix.service';

describe('Component Tests', () => {
    describe('PartMySuffix Management Delete Component', () => {
        let comp: PartMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PartMySuffixDeleteDialogComponent>;
        let service: PartMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [PartMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PartMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PartMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartMySuffixService);
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
