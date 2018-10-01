import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRepair } from 'app/shared/model/repair.model';

type EntityResponseType = HttpResponse<IRepair>;
type EntityArrayResponseType = HttpResponse<IRepair[]>;

@Injectable({ providedIn: 'root' })
export class RepairService {
    private resourceUrl = SERVER_API_URL + 'api/repairs';

    constructor(private http: HttpClient) {}

    create(repair: IRepair): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(repair);
        return this.http
            .post<IRepair>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(repair: IRepair): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(repair);
        return this.http
            .put<IRepair>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    report(id: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/1/pdf`, { observe: 'response', responseType: 'blob' }).pipe(
            map(res => {
                return new Blob([res.body], { type: 'application/pdf' });
            })
        );
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRepair>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRepair[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(repair: IRepair): IRepair {
        const copy: IRepair = Object.assign({}, repair, {
            date: repair.date != null && repair.date.isValid() ? repair.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((repair: IRepair) => {
            repair.date = repair.date != null ? moment(repair.date) : null;
        });
        return res;
    }
}
