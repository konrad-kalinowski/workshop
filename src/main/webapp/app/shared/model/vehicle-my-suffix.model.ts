export interface IVehicleMySuffix {
    id?: number;
    registrationNumber?: string;
    brand?: string;
    model?: string;
    ownerId?: number;
}

export class VehicleMySuffix implements IVehicleMySuffix {
    constructor(
        public id?: number,
        public registrationNumber?: string,
        public brand?: string,
        public model?: string,
        public ownerId?: number
    ) {}
}
