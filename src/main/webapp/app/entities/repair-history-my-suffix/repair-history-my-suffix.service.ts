import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepairHistoryMySuffix } from 'app/shared/model/repair-history-my-suffix.model';

type EntityResponseType = HttpResponse<IRepairHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<IRepairHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RepairHistoryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/repair-histories';

    constructor(private http: HttpClient) {}

    create(repairHistory: IRepairHistoryMySuffix): Observable<EntityResponseType> {
        return this.http.post<IRepairHistoryMySuffix>(this.resourceUrl, repairHistory, { observe: 'response' });
    }

    update(repairHistory: IRepairHistoryMySuffix): Observable<EntityResponseType> {
        return this.http.put<IRepairHistoryMySuffix>(this.resourceUrl, repairHistory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRepairHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRepairHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
