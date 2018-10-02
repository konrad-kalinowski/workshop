import { IRepair } from 'app/shared/model//repair.model';

export interface IRepairHistory {
    id?: number;
    vehicleId?: number;
    repairs?: IRepair[];
}

export class RepairHistory implements IRepairHistory {
    constructor(public id?: number, public vehicleId?: number, public repairs?: IRepair[]) {}
}
