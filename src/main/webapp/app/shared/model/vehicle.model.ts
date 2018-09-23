import { IOwner } from 'app/shared/model/owner.model';

export interface IVehicle {
    id?: number;
    registrationNumber?: string;
    brand?: string;
    model?: string;
    historyId?: number;
    owner?: IOwner;
}

export class Vehicle implements IVehicle {
    constructor(
        public id?: number,
        public registrationNumber?: string,
        public brand?: string,
        public model?: string,
        public historyId?: number,
        public owner?: IOwner
    ) {}
}
