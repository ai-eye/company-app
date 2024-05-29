import { Injectable } from '@angular/core';
import { ICompany, ICompanySearchResponse } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class TestHelperService {

  mockCompanySearchResponse(listLength: number = 1): ICompanySearchResponse {
    return {
      "items": this.mockCompanyList(listLength),
      "kind": "search#companies",
      "total_results": listLength,
      "page_number": 1
    }
  }

  mockCompanyList(listLength: number = 1): ICompany[] {
    const list: ICompany[] = [];
    for (let i = 1; i <= listLength; i++) {
      const s = i.toString();
      list.push({
        "company_number": s,
        "title": "Test Title " + s,
        "description": "Test Description " + s,
        "company_status": "active",
        "company_type": "ltd",
        "address_snippet": s + " Test Street"
      });
    }
    return list
  }

}
