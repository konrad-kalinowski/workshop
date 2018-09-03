/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { VehicleMySuffixUpdateComponent } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix-update.component';
import { VehicleMySuffixService } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix.service';
import { VehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';

describe('Component Tests', () => {
    describe('VehicleMySuffix Management Update Component', () => {
        let comp: VehicleMySuffixUpdateComponent;
        let fixture: ComponentFixture<VehicleMySuffixUpdateComponent>;
        let service: VehicleMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [VehicleMySuffixUpdateComponent]
            })
                .overrideTemplate(VehicleMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VehicleMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vehicle = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VehicleMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vehicle = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
