import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';
import { OwnerMySuffixService } from './owner-my-suffix.service';

@Component({
    selector: 'jhi-owner-my-suffix-update',
    templateUrl: './owner-my-suffix-update.component.html'
})
export class OwnerMySuffixUpdateComponent implements OnInit {
    private _owner: IOwnerMySuffix;
    isSaving: boolean;

    constructor(private ownerService: OwnerMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ owner }) => {
            this.owner = owner;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.owner.id !== undefined) {
            this.subscribeToSaveResponse(this.ownerService.update(this.owner));
        } else {
            this.subscribeToSaveResponse(this.ownerService.create(this.owner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOwnerMySuffix>>) {
        result.subscribe((res: HttpResponse<IOwnerMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get owner() {
        return this._owner;
    }

    set owner(owner: IOwnerMySuffix) {
        this._owner = owner;
    }
}
