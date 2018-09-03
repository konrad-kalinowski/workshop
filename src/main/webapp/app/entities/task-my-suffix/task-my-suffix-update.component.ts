import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';

@Component({
    selector: 'jhi-task-my-suffix-update',
    templateUrl: './task-my-suffix-update.component.html'
})
export class TaskMySuffixUpdateComponent implements OnInit {
    private _task: ITaskMySuffix;
    isSaving: boolean;

    constructor(private taskService: TaskMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaskMySuffix>>) {
        result.subscribe((res: HttpResponse<ITaskMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get task() {
        return this._task;
    }

    set task(task: ITaskMySuffix) {
        this._task = task;
    }
}
