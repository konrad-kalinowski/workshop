/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkshopTestModule } from '../../../test.module';
import { VehicleMySuffixDetailComponent } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix-detail.component';
import { VehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';

describe('Component Tests', () => {
    describe('VehicleMySuffix Management Detail Component', () => {
        let comp: VehicleMySuffixDetailComponent;
        let fixture: ComponentFixture<VehicleMySuffixDetailComponent>;
        const route = ({ data: of({ vehicle: new VehicleMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkshopTestModule],
                declarations: [VehicleMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VehicleMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vehicle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
