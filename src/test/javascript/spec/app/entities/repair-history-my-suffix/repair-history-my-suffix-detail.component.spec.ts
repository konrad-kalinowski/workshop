/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { RepairHistoryMySuffixDetailComponent } from 'app/entities/repair-history-my-suffix/repair-history-my-suffix-detail.component';
import { RepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';

describe('Component Tests', () => {
    describe('RepairHistoryMySuffix Management Detail Component', () => {
        let comp: RepairHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<RepairHistoryMySuffixDetailComponent>;
        const route = ({ data: of({ repairHistory: new RepairHistoryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [RepairHistoryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RepairHistoryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RepairHistoryMySuffixDetailComponent);
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
