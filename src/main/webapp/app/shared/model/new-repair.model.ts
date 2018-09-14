import { IVehicle } from 'app/shared/model/vehicle.model';
import { IPart } from 'app/shared/model/part.model';
import { ITask } from 'app/shared/model/task.model';

export interface INewRepair {
    vehicle: IVehicle;
    repairDate: string;
    parts: IPart[];
    tasks: ITask[];
}

export class NewRepair implements INewRepair {
    constructor(
        public vehicle: IVehicle,
        public repairDate: string,
        public parts: IPart[],
        public tasks: ITask[]
    ) { }
}
