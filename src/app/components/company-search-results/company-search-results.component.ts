import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ca-company-search-results',
  standalone: true,
  imports: [CommonModule, CompanyListComponent, CompanyDetailComponent, SpinnerComponent, ErrorComponent],
  templateUrl: './company-search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySearchResultsComponent implements OnInit {
  #companyService = inject(CompanyService);

  companyList$ = this.#companyService.companyList$;
  loading$ = this.#companyService.loading$;
  error$ = this.#companyService.error$;

  @Input()
  query: string = '';

  ngOnInit() {
    this.#companyService.getCompanyList(this.query);
  }
}
