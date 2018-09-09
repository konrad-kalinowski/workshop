/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairHistoryUpdateComponent } from 'app/entities/repair-history/repair-history-update.component';
import { RepairHistoryService } from 'app/entities/repair-history/repair-history.service';
import { RepairHistory } from 'app/shared/model/repair-history.model';

describe('Component Tests', () => {
    describe('RepairHistory Management Update Component', () => {
        let comp: RepairHistoryUpdateComponent;
        let fixture: ComponentFixture<RepairHistoryUpdateComponent>;
        let service: RepairHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairHistoryUpdateComponent]
            })
                .overrideTemplate(RepairHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepairHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairHistoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RepairHistory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.repairHistory = entity;
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
                    const entity = new RepairHistory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.repairHistory = entity;
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
