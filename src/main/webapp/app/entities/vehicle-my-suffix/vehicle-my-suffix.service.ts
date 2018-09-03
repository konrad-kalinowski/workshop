import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';

type EntityResponseType = HttpResponse<IVehicleMySuffix>;
type EntityArrayResponseType = HttpResponse<IVehicleMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class VehicleMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/vehicles';

    constructor(private http: HttpClient) {}

    create(vehicle: IVehicleMySuffix): Observable<EntityResponseType> {
        return this.http.post<IVehicleMySuffix>(this.resourceUrl, vehicle, { observe: 'response' });
    }

    update(vehicle: IVehicleMySuffix): Observable<EntityResponseType> {
        return this.http.put<IVehicleMySuffix>(this.resourceUrl, vehicle, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVehicleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVehicleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
