export interface IOwnerMySuffix {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

export class OwnerMySuffix implements IOwnerMySuffix {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string
    ) {}
}
