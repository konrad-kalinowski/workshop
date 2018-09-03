/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairMySuffixDetailComponent } from 'app/entities/repair-my-suffix/repair-my-suffix-detail.component';
import { RepairMySuffix } from 'app/shared/model/repair-my-suffix.model';

describe('Component Tests', () => {
    describe('RepairMySuffix Management Detail Component', () => {
        let comp: RepairMySuffixDetailComponent;
        let fixture: ComponentFixture<RepairMySuffixDetailComponent>;
        const route = ({ data: of({ repair: new RepairMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepairMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepairMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.repair).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
