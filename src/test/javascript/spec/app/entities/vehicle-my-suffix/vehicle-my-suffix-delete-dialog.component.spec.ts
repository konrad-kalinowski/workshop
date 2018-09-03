/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkshopTestModule } from '../../../test.module';
import { VehicleMySuffixDeleteDialogComponent } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix-delete-dialog.component';
import { VehicleMySuffixService } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix.service';

describe('Component Tests', () => {
    describe('VehicleMySuffix Management Delete Component', () => {
        let comp: VehicleMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleMySuffixDeleteDialogComponent>;
        let service: VehicleMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [VehicleMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(VehicleMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleMySuffixService);
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
