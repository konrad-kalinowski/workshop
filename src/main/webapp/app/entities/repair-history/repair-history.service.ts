import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepairHistory } from 'app/shared/model/repair-history.model';

type EntityResponseType = HttpResponse<IRepairHistory>;
type EntityArrayResponseType = HttpResponse<IRepairHistory[]>;

@Injectable({ providedIn: 'root' })
export class RepairHistoryService {
    private resourceUrl = SERVER_API_URL + 'api/repair-histories';

    constructor(private http: HttpClient) {}

    create(repairHistory: IRepairHistory): Observable<EntityResponseType> {
        return this.http.post<IRepairHistory>(this.resourceUrl, repairHistory, { observe: 'response' });
    }

    update(repairHistory: IRepairHistory): Observable<EntityResponseType> {
        return this.http.put<IRepairHistory>(this.resourceUrl, repairHistory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRepairHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRepairHistory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
