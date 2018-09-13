import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/entities/task';
import { PartService } from 'app/entities/part';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ITask } from 'app/shared/model/task.model';
import { JhiAlertService } from 'ng-jhipster';
import { IPart } from 'app/shared/model/part.model';

@Component({
  selector: 'jhi-repair-form',
  templateUrl: './repair-form.component.html'
})
export class RepairFormComponent implements OnInit {

  tasks: ITask[];
  parts: IPart[];

  selectedTasks = [];

  constructor(
    private jhiAlertService: JhiAlertService,
    private taskService: TaskService,
    private partService: PartService) {

  }

  ngOnInit() {
    this.taskService.query().subscribe(
      (res: HttpResponse<ITask[]>) => {
        this.tasks = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.partService.query().subscribe(
      (res: HttpResponse<IPart[]>) => {
        this.parts = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
