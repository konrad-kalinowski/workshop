export interface IPart {
    id?: number;
    name?: string;
}

export class Part implements IPart {
    constructor(public id?: number, public name?: string) {}
}
