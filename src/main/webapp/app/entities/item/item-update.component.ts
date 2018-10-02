import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IItem } from 'app/shared/model/item.model';
import { ItemService } from './item.service';
import { IRepair } from 'app/shared/model/repair.model';
import { RepairService } from 'app/entities/repair';

@Component({
    selector: 'jhi-item-update',
    templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent implements OnInit {
    private _item: IItem;
    isSaving: boolean;

    repairs: IRepair[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private itemService: ItemService,
        private repairService: RepairService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ item }) => {
            this.item = item;
        });
        this.repairService.query().subscribe(
            (res: HttpResponse<IRepair[]>) => {
                this.repairs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.item.id !== undefined) {
            this.subscribeToSaveResponse(this.itemService.update(this.item));
        } else {
            this.subscribeToSaveResponse(this.itemService.create(this.item));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IItem>>) {
        result.subscribe((res: HttpResponse<IItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRepairById(index: number, item: IRepair) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get item() {
        return this._item;
    }

    set item(item: IItem) {
        this._item = item;
    }
}
