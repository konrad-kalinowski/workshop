import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanyInfo } from 'app/shared/model/company-info.model';

type EntityResponseType = HttpResponse<ICompanyInfo>;
type EntityArrayResponseType = HttpResponse<ICompanyInfo[]>;

@Injectable({ providedIn: 'root' })
export class CompanyInfoService {
    private resourceUrl = SERVER_API_URL + 'api/company-infos';

    constructor(private http: HttpClient) {}

    create(companyInfo: ICompanyInfo): Observable<EntityResponseType> {
        return this.http.post<ICompanyInfo>(this.resourceUrl, companyInfo, { observe: 'response' });
    }

    update(companyInfo: ICompanyInfo): Observable<EntityResponseType> {
        return this.http.put<ICompanyInfo>(this.resourceUrl, companyInfo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanyInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanyInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
