import { Moment } from 'moment';
import { IItem } from 'app/shared/model//item.model';

export interface IRepair {
    id?: number;
    date?: Moment;
    items?: IItem[];
    historyId?: number;
}

export class Repair implements IRepair {
    constructor(public id?: number, public date?: Moment, public items?: IItem[], public historyId?: number) {}
}
