import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPartMySuffix } from 'app/shared/model/part-my-suffix.model';
import { PartMySuffixService } from './part-my-suffix.service';

@Component({
    selector: 'jhi-part-my-suffix-update',
    templateUrl: './part-my-suffix-update.component.html'
})
export class PartMySuffixUpdateComponent implements OnInit {
    private _part: IPartMySuffix;
    isSaving: boolean;

    constructor(private partService: PartMySuffixService, private activatedRoute: ActivatedRoute) {}

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPartMySuffix>>) {
        result.subscribe((res: HttpResponse<IPartMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    set part(part: IPartMySuffix) {
        this._part = part;
    }
}
