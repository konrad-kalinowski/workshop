export interface ITaskMySuffix {
    id?: number;
    title?: string;
}

export class TaskMySuffix implements ITaskMySuffix {
    constructor(public id?: number, public title?: string) {}
}
