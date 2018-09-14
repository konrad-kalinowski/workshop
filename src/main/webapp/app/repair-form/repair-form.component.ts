import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/entities/task';
import { PartService } from 'app/entities/part';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ITask } from 'app/shared/model/task.model';
import { JhiAlertService } from 'ng-jhipster';
import { IPart } from 'app/shared/model/part.model';
import { OwnerService } from 'app/entities/owner';
import { IOwner } from 'app/shared/model/owner.model';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { VehicleService } from 'app/entities/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-repair-form',
  templateUrl: './repair-form.component.html'
})
export class RepairFormComponent implements OnInit {

  owners: IOwner[];
  tasks: ITask[];
  parts: IPart[];
  vehicles: IVehicle[];

  isSaving: boolean;
  selectedVehicle: IVehicle;
  selectedOwner: IOwner;
  selectedTasks = [];

  constructor(
    private jhiAlertService: JhiAlertService,
    private taskService: TaskService,
    private ownerService: OwnerService,
    private partService: PartService,
    private vehicleService: VehicleService,
    private router: Router,
    ) {

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
    this.ownerService.query().subscribe(
      (res: HttpResponse<IOwner[]>) => {
        this.owners = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  fetchOwnerVehicles() {
    this.vehicleService.query({
      ownerId: this.selectedOwner.id
  }).subscribe(
      (res: HttpResponse<IVehicle[]>) => {
        this.vehicles = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  save() {
}
  previousState() {
    this.router.navigate(['']);
  }
  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
