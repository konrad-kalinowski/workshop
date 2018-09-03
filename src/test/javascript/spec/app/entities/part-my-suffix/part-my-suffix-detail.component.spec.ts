/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { PartMySuffixDetailComponent } from 'app/entities/part-my-suffix/part-my-suffix-detail.component';
import { PartMySuffix } from 'app/shared/model/part-my-suffix.model';

describe('Component Tests', () => {
    describe('PartMySuffix Management Detail Component', () => {
        let comp: PartMySuffixDetailComponent;
        let fixture: ComponentFixture<PartMySuffixDetailComponent>;
        const route = ({ data: of({ part: new PartMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [PartMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PartMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PartMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.part).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
