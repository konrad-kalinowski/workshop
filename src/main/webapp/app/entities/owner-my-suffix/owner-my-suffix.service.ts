import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOwnerMySuffix } from 'app/shared/model/owner-my-suffix.model';

type EntityResponseType = HttpResponse<IOwnerMySuffix>;
type EntityArrayResponseType = HttpResponse<IOwnerMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OwnerMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/owners';

    constructor(private http: HttpClient) {}

    create(owner: IOwnerMySuffix): Observable<EntityResponseType> {
        return this.http.post<IOwnerMySuffix>(this.resourceUrl, owner, { observe: 'response' });
    }

    update(owner: IOwnerMySuffix): Observable<EntityResponseType> {
        return this.http.put<IOwnerMySuffix>(this.resourceUrl, owner, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOwnerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOwnerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
