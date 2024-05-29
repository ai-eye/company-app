/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { ICompanySearchResponse } from '../interfaces/company.interface';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { API_KEY } from '../secrets';
import { IOfficersResponse } from '../interfaces/officers.interface';

// This is a placeholder URL for demonstration purposes only. - move to config 
export const COMPANIES_API_URL = 'https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Search';
export const OFFICERS_API_URL = 'https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #http = inject(HttpClient);

  getCompanySearchResponse(query: string) {
    return this.#http.get<ICompanySearchResponse>(`${COMPANIES_API_URL}?Query=${query}`, {
      headers: { //can add to interceptor
        'x-api-key': API_KEY
      }
    }).pipe(catchError(this.#handleError));
  }

  getOfficersResponse(companyNumber: string) {
    return this.#http.get<IOfficersResponse>(`${OFFICERS_API_URL}=${companyNumber}`, {
      headers: {
        'x-api-key': API_KEY
      }
    }).pipe(catchError(this.#handleError));
  }

  #handleError(error: unknown) { //TODO: Implement error handling
    console.error('Error:', error);
    return [];
  }
}
