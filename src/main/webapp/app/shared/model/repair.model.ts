import { Moment } from 'moment';
import { IPart } from 'app/shared/model//part.model';
import { ITask } from 'app/shared/model//task.model';

export interface IRepair {
    id?: number;
    price?: number;
    date?: Moment;
    parts?: IPart[];
    tasks?: ITask[];
    historyId?: number;
}

export class Repair implements IRepair {
    constructor(
        public id?: number,
        public price?: number,
        public date?: Moment,
        public parts?: IPart[],
        public tasks?: ITask[],
        public historyId?: number
    ) {}
}
