/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairUpdateComponent } from 'app/entities/repair/repair-update.component';
import { RepairService } from 'app/entities/repair/repair.service';
import { Repair } from 'app/shared/model/repair.model';

describe('Component Tests', () => {
    describe('Repair Management Update Component', () => {
        let comp: RepairUpdateComponent;
        let fixture: ComponentFixture<RepairUpdateComponent>;
        let service: RepairService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairUpdateComponent]
            })
                .overrideTemplate(RepairUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepairUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Repair(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.repair = entity;
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
                    const entity = new Repair();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.repair = entity;
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
