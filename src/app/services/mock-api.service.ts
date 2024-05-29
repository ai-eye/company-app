/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { ICompanySearchResponse } from '../interfaces/company.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IOfficersResponse } from '../interfaces/officers.interface';
import { Observable, delay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  #http = inject(HttpClient);

  constructor() {
    console.log('MockApiService instantiated');
  }

  /* (local) dev workaround for broken CORS issue USING LOCALHOST json-server db.json file.  */
  getCompanySearchResponse(query: string) {
    console.debug('using mock getCompanySearchResponse with query', query);
    return this.#http.get<ICompanySearchResponse>(`http://localhost:3000/Companies/`)
    .pipe(delay(800)) //simulate network delay
  }
  
  /* (local) dev workaround for broken CORS issue USING LOCALHOST json-server db.json file.  */
  getOfficersResponse(companyNumber: string) {
    console.debug('using mock getOfficersResponse with companyNumber', companyNumber);
    return this.#http.get<IOfficersResponse>(`http://localhost:3000/Officers/`)
    .pipe(delay(800)) //simulate network delay
  }
  
  getAndThrow500(): Observable<never> {
    // Simulate an HTTP error response
    return throwError(() => new HttpErrorResponse({
      error: 'Simulated network error',
      status: 500,
      statusText: 'Internal Server Error'
    }));
  }
}
