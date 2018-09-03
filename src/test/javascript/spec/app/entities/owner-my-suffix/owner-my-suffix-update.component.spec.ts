/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { OwnerMySuffixUpdateComponent } from 'app/entities/owner-my-suffix/owner-my-suffix-update.component';
import { OwnerMySuffixService } from 'app/entities/owner-my-suffix/owner-my-suffix.service';
import { OwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';

describe('Component Tests', () => {
    describe('OwnerMySuffix Management Update Component', () => {
        let comp: OwnerMySuffixUpdateComponent;
        let fixture: ComponentFixture<OwnerMySuffixUpdateComponent>;
        let service: OwnerMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [OwnerMySuffixUpdateComponent]
            })
                .overrideTemplate(OwnerMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OwnerMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OwnerMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OwnerMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.owner = entity;
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
                    const entity = new OwnerMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.owner = entity;
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
