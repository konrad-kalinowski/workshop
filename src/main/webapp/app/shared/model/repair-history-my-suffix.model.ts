export interface IRepairHistoryMySuffix {
    id?: number;
    vehicleId?: number;
}

export class RepairHistoryMySuffix implements IRepairHistoryMySuffix {
    constructor(public id?: number, public vehicleId?: number) {}
}
