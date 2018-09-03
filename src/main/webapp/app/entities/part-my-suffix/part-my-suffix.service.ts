import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPartMySuffix } from 'app/shared/model/part-my-suffix.model';

type EntityResponseType = HttpResponse<IPartMySuffix>;
type EntityArrayResponseType = HttpResponse<IPartMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PartMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/parts';

    constructor(private http: HttpClient) {}

    create(part: IPartMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPartMySuffix>(this.resourceUrl, part, { observe: 'response' });
    }

    update(part: IPartMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPartMySuffix>(this.resourceUrl, part, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPartMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPartMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
