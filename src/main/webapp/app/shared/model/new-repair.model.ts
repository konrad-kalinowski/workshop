import { IVehicle } from 'app/shared/model/vehicle.model';
import { IItem } from 'app/shared/model/item.model';

export interface INewRepair {
    vehicle: IVehicle;
    repairDate: string;
    items: IItem[];
}

export class NewRepair implements INewRepair {
    constructor(public vehicle: IVehicle, public repairDate: string, public items: IItem[]) {}
}
