/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairHistoryMySuffixUpdateComponent } from 'app/entities/repair-history-my-suffix/repair-history-my-suffix-update.component';
import { RepairHistoryMySuffixService } from 'app/entities/repair-history-my-suffix/repair-history-my-suffix.service';
import { RepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';

describe('Component Tests', () => {
    describe('RepairHistoryMySuffix Management Update Component', () => {
        let comp: RepairHistoryMySuffixUpdateComponent;
        let fixture: ComponentFixture<RepairHistoryMySuffixUpdateComponent>;
        let service: RepairHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairHistoryMySuffixUpdateComponent]
            })
                .overrideTemplate(RepairHistoryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepairHistoryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairHistoryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RepairHistoryMySuffix(123);
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
                    const entity = new RepairHistoryMySuffix();
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
