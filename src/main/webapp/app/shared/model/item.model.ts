import { IRepair } from 'app/shared/model//repair.model';

export interface IItem {
    id?: number;
    name?: string;
    price?: number;
    repairs?: IRepair[];
}

export class Item implements IItem {
    constructor(public id?: number, public name?: string, public price?: number, public repairs?: IRepair[]) {}
}
