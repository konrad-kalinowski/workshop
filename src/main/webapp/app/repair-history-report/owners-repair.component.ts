import { Component, OnInit } from '@angular/core';
import { RepairService } from 'app/entities/repair';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IRepair } from 'app/shared/model/repair.model';
import { JhiParseLinks, JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal } from 'app/core';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { IRepairHistory } from 'app/shared/model/repair-history.model';
import saveAs from 'file-saver';

@Component({
    selector: 'jhi-owners-repair',
    templateUrl: './owners-repair.component.html',
    styles: []
})
export class OwnersRepairComponent implements OnInit {
    currentAccount: any;
    repairs: IRepair[];
    itemsPerPage: any;
    page: any;
    links: any;
    totalItems: any;
    queryCount: any;
    predicate: any;
    reverse: any;
    eventSubscriber: Subscription;
    routeData: any;
    previousPage: any;
    repairHistory: IRepairHistory;

    constructor(
        private repairService: RepairService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.repairHistory = data.repairHistory;
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRepairs();
    }

    loadAll() {
        this.repairService
            .query({
                historyId: this.repairHistory.id,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IRepair[]>) => this.paginateRepairs(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    private paginateRepairs(data: IRepair[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.repairs = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    registerChangeInRepairs() {
        this.eventSubscriber = this.eventManager.subscribe('repairListModification', response => this.loadAll());
    }

    transition() {
        this.router.navigate(['/repair-history-report', 1], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    print(repair: IRepair) {
        this.repairService.report(repair.id).subscribe(data => {
            saveAs(data, 'test.pdf');
        });
    }
}
