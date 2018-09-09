export interface IVehicle {
    id?: number;
    registrationNumber?: string;
    brand?: string;
    model?: string;
    ownerId?: number;
}

export class Vehicle implements IVehicle {
    constructor(
        public id?: number,
        public registrationNumber?: string,
        public brand?: string,
        public model?: string,
        public ownerId?: number
    ) {}
}
