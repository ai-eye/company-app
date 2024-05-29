import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, BehaviorSubject, finalize, take } from 'rxjs';
import { ICompany, ICompanySearchResponse } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  #apiService = inject(ApiService);

  #companySearchResponseSubject = new BehaviorSubject<ICompanySearchResponse>(<ICompanySearchResponse>{});
  #companyListSubject = new BehaviorSubject<ICompany[]>(<ICompany[]>[]);
  #companyDetailSubject = new BehaviorSubject<ICompany>(<ICompany>{});
  #loadingSubject = new BehaviorSubject<boolean>(false);
  #errorSubject = new BehaviorSubject<string | null>(null);
  #companyDetailErrorSubject = new BehaviorSubject<string | null>(null);

  companyList$ = this.#companyListSubject.asObservable();
  companyDetail$ = this.#companyDetailSubject.asObservable();
  companyDetailError$ = this.#companyDetailErrorSubject.asObservable();
  loading$ = this.#loadingSubject.asObservable();
  error$ = this.#errorSubject.asObservable();

  getCompanyList(query: string) {
    this.#loadingSubject.next(true);
    this.#errorSubject.next(null);

    this.#apiService.getCompanySearchResponse(query).pipe(
      catchError(error => {
        this.#errorSubject.next(error);
        return [];
      }),
      finalize(() => this.#loadingSubject.next(false))
    ).subscribe(response => {
      this.#companySearchResponseSubject.next(response); //todo: pagination holds paging info?
      this.#companyListSubject.next(response.items);
    });
  }

  getCompanyDetailFromList(companyNumber: string) {
    this.#companyDetailErrorSubject.next(null);
    this.companyList$
      .pipe(take(1))
      .subscribe(list => {
        const match = list.find(item => item.company_number === companyNumber);

        if (match) {
          this.#companyDetailSubject.next(match);
        } else {
          this.#companyDetailErrorSubject.next('Company not found in existing list. Please search again.');
        }
      })
  }
}

