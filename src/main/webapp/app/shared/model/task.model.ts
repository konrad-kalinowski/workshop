import { IRepair } from 'app/shared/model//repair.model';

export interface ITask {
    id?: number;
    title?: string;
    repairs?: IRepair[];
}

export class Task implements ITask {
    constructor(public id?: number, public title?: string, public repairs?: IRepair[]) {}
}
