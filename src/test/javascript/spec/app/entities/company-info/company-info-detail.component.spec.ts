/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { CompanyInfoDetailComponent } from 'app/entities/company-info/company-info-detail.component';
import { CompanyInfo } from 'app/shared/model/company-info.model';

describe('Component Tests', () => {
    describe('CompanyInfo Management Detail Component', () => {
        let comp: CompanyInfoDetailComponent;
        let fixture: ComponentFixture<CompanyInfoDetailComponent>;
        const route = ({ data: of({ companyInfo: new CompanyInfo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [CompanyInfoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanyInfoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanyInfoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companyInfo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
