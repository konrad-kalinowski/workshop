import { IVehicle } from 'app/shared/model//vehicle.model';

export interface IOwner {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    vehicles?: IVehicle[];
}

export class Owner implements IOwner {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public vehicles?: IVehicle[]
    ) {}
}
