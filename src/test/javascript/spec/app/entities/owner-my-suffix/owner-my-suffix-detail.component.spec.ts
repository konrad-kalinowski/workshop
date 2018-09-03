/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { OwnerMySuffixDetailComponent } from 'app/entities/owner-my-suffix/owner-my-suffix-detail.component';
import { OwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';

describe('Component Tests', () => {
    describe('OwnerMySuffix Management Detail Component', () => {
        let comp: OwnerMySuffixDetailComponent;
        let fixture: ComponentFixture<OwnerMySuffixDetailComponent>;
        const route = ({ data: of({ owner: new OwnerMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [OwnerMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OwnerMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OwnerMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.owner).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
