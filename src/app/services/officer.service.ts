import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, BehaviorSubject, finalize } from 'rxjs';
import { IOfficersResponse } from '../interfaces/officers.interface';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  #apiService = inject(ApiService);

  #officerListSubject = new BehaviorSubject<IOfficersResponse>(<IOfficersResponse>{});
  #loadingSubject = new BehaviorSubject<boolean>(false);
  #errorSubject = new BehaviorSubject<string | null>(null);

  officerList$ = this.#officerListSubject.asObservable();
  loading$ = this.#loadingSubject.asObservable();
  error$ = this.#errorSubject.asObservable();

  getOfficerList(query: string) {
    this.#loadingSubject.next(true);
    this.#errorSubject.next(null);

    this.#apiService.getOfficersResponse(query).pipe(
      catchError(error => {
        this.#errorSubject.next(error);
        return [];
      }),
      finalize(() => this.#loadingSubject.next(false))
    ).subscribe(officerList => {
      this.#officerListSubject.next(officerList);
    });
  }
}

