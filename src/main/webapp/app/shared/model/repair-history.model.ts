export interface IRepairHistory {
    id?: number;
    vehicleId?: number;
}

export class RepairHistory implements IRepairHistory {
    constructor(public id?: number, public vehicleId?: number) {}
}
