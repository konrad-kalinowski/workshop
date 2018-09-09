import { Moment } from 'moment';

export interface IRepair {
    id?: number;
    price?: number;
    date?: Moment;
    historyId?: number;
    taskId?: number;
    partId?: number;
}

export class Repair implements IRepair {
    constructor(
        public id?: number,
        public price?: number,
        public date?: Moment,
        public historyId?: number,
        public taskId?: number,
        public partId?: number
    ) {}
}
