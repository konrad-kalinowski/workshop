/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairHistoryDetailComponent } from 'app/entities/repair-history/repair-history-detail.component';
import { RepairHistory } from 'app/shared/model/repair-history.model';

describe('Component Tests', () => {
    describe('RepairHistory Management Detail Component', () => {
        let comp: RepairHistoryDetailComponent;
        let fixture: ComponentFixture<RepairHistoryDetailComponent>;
        const route = ({ data: of({ repairHistory: new RepairHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepairHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepairHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.repairHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
