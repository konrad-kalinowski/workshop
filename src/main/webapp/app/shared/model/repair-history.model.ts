import { IRepair } from 'app/shared/model//repair.model';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IRepairHistory {
    id?: number;
    vehicle?: IVehicle;
    repairs?: IRepair[];
}

export class RepairHistory implements IRepairHistory {
    constructor(public id?: number, public vehicle?: IVehicle, public repairs?: IRepair[]) {}
}
