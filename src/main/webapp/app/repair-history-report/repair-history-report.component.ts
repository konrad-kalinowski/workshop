import { Component, OnInit } from '@angular/core';
import { IRepair } from 'app/shared/model/repair.model';
import { RepairService } from 'app/entities/repair';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Router, ActivatedRoute } from '@angular/router';
import { IOwner } from 'app/shared/model/owner.model';
import { Principal } from 'app/core';
import { Subscription } from 'rxjs';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IRepairHistory } from 'app/shared/model/repair-history.model';
import { RepairHistoryService } from 'app/entities/repair-history';

@Component({
  selector: 'jhi-repair-history-report',
  templateUrl: './repair-history-report.component.html',
  styleUrls: [
    'repair-history-report.scss'
  ]
})
export class RepairHistoryReportComponent implements OnInit {

  repairHistories: IRepairHistory[];
  currentAccount: any;
  repairs: IRepair[];
  itemsPerPage: any;
  page: any;
  predicate: any;
  reverse: any;
  links: any;
  totalItems: any;
  queryCount: any;
  eventSubscriber: Subscription;
  owner: IOwner;
  routeData: any;
  previousPage: any;
  repairHistory: IRepairHistory;

  constructor(
    private parseLinks: JhiParseLinks,
    private repairHistoryService: RepairHistoryService,
    private jhiAlertService: JhiAlertService,
    private router: Router,
    private principal: Principal,
    private eventManager: JhiEventManager,
    private activatedRoute: ActivatedRoute
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
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
    this.registerChangeInRepairHistories();

  }
  registerChangeInRepairHistories() {
    this.eventSubscriber = this.eventManager.subscribe('repairHistoryListModification', response => this.loadAll());
  }

  loadAll() {
    this.repairHistoryService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IRepairHistory[]>) => this.paginateRepairHistories(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  transition() {
    this.router.navigate(['/repair-history-report'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  registerChangeInRepairs() {
    this.eventSubscriber = this.eventManager.subscribe('repairListModification', response => this.loadAll());
  }
  clear() {
    this.page = 0;
    this.router.navigate([
      '/repair',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
  private paginateRepairHistories(data: IRepairHistory[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.queryCount = this.totalItems;
    this.repairHistories = data;
  }
}
