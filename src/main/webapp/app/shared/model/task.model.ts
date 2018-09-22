export interface ITask {
    id?: number;
    title?: string;
}

export class Task implements ITask {
    constructor(public id?: number, public title?: string) {}
}
