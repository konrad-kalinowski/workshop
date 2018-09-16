import { Moment } from 'moment';
import { IPart } from 'app/shared/model//part.model';

export interface IRepair {
    id?: number;
    price?: number;
    date?: Moment;
    historyId?: number;
    taskId?: number;
    parts?: IPart[];
}

export class Repair implements IRepair {
    constructor(
        public id?: number,
        public price?: number,
        public date?: Moment,
        public historyId?: number,
        public taskId?: number,
        public parts?: IPart[]
    ) {}
}
