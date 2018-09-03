/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { PartMySuffixUpdateComponent } from 'app/entities/part-my-suffix/part-my-suffix-update.component';
import { PartMySuffixService } from 'app/entities/part-my-suffix/part-my-suffix.service';
import { PartMySuffix } from 'app/shared/model/part-my-suffix.model';

describe('Component Tests', () => {
    describe('PartMySuffix Management Update Component', () => {
        let comp: PartMySuffixUpdateComponent;
        let fixture: ComponentFixture<PartMySuffixUpdateComponent>;
        let service: PartMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [PartMySuffixUpdateComponent]
            })
                .overrideTemplate(PartMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PartMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PartMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.part = entity;
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
                    const entity = new PartMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.part = entity;
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
