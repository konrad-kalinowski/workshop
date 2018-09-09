/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairDetailComponent } from 'app/entities/repair/repair-detail.component';
import { Repair } from 'app/shared/model/repair.model';

describe('Component Tests', () => {
    describe('Repair Management Detail Component', () => {
        let comp: RepairDetailComponent;
        let fixture: ComponentFixture<RepairDetailComponent>;
        const route = ({ data: of({ repair: new Repair(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepairDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepairDetailComponent);
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
