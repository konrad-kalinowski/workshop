/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairMySuffixUpdateComponent } from 'app/entities/repair-my-suffix/repair-my-suffix-update.component';
import { RepairMySuffixService } from 'app/entities/repair-my-suffix/repair-my-suffix.service';
import { RepairMySuffix } from 'app/shared/model/repair-my-suffix.model';

describe('Component Tests', () => {
    describe('RepairMySuffix Management Update Component', () => {
        let comp: RepairMySuffixUpdateComponent;
        let fixture: ComponentFixture<RepairMySuffixUpdateComponent>;
        let service: RepairMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairMySuffixUpdateComponent]
            })
                .overrideTemplate(RepairMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RepairMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RepairMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RepairMySuffix(123);
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
                    const entity = new RepairMySuffix();
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
