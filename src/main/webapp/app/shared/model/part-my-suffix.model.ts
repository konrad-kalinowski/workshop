export interface IPartMySuffix {
    id?: number;
    name?: string;
}

export class PartMySuffix implements IPartMySuffix {
    constructor(public id?: number, public name?: string) {}
}
