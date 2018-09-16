import { IRepair } from 'app/shared/model//repair.model';

export interface IPart {
    id?: number;
    name?: string;
    repairs?: IRepair[];
}

export class Part implements IPart {
    constructor(public id?: number, public name?: string, public repairs?: IRepair[]) {}
}
