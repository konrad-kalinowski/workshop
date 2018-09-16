import { Moment } from 'moment';
import { IPart } from 'app/shared/model//part.model';
import { ITask } from 'app/shared/model//task.model';

export interface IRepair {
    id?: number;
    price?: number;
    date?: Moment;
    historyId?: number;
    parts?: IPart[];
    tasks?: ITask[];
}

export class Repair implements IRepair {
    constructor(
        public id?: number,
        public price?: number,
        public date?: Moment,
        public historyId?: number,
        public parts?: IPart[],
        public tasks?: ITask[]
    ) {}
}
