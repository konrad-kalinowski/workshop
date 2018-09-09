import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPart } from 'app/shared/model/part.model';
import { PartService } from './part.service';

@Component({
    selector: 'jhi-part-update',
    templateUrl: './part-update.component.html'
})
export class PartUpdateComponent implements OnInit {
    private _part: IPart;
    isSaving: boolean;

    constructor(private partService: PartService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ part }) => {
            this.part = part;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.part.id !== undefined) {
            this.subscribeToSaveResponse(this.partService.update(this.part));
        } else {
            this.subscribeToSaveResponse(this.partService.create(this.part));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPart>>) {
        result.subscribe((res: HttpResponse<IPart>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get part() {
        return this._part;
    }

    set part(part: IPart) {
        this._part = part;
    }
}
