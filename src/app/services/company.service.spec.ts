import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CompanyService } from './company.service';
import { ApiService } from './api.service';
import { TestHelperService } from './test-helper.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getCompanySearchResponse', 'getCompanyDetail', 'getCompanyOfficers']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy },]
    });

    service = TestBed.inject(CompanyService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

  });

  it('should call the API service to get company list', () => {
    const query = 'example';
    const help = new TestHelperService();
    const mockCompanyList = help.mockCompanySearchResponse(2);
    apiService.getCompanySearchResponse.and.returnValue(of(mockCompanyList));

    service.getCompanyList(query);

    expect(apiService.getCompanySearchResponse).toHaveBeenCalledWith(query);
    service.companyList$.subscribe((value) => expect(value).toBe(mockCompanyList.items))
    service.loading$.subscribe((value) => expect(value).toBe(false))
    service.companyList$.subscribe((value) => expect(value).toBe(mockCompanyList.items))
    service.error$.subscribe((value) => expect(value).toBe(null))
  });

  it('should get company detail from list', fakeAsync(() => {
    const companyNumber = '1';
    const help = new TestHelperService();
    const mockCompanyList = help.mockCompanySearchResponse(2);
    apiService.getCompanySearchResponse.and.returnValue(of(mockCompanyList));
    service.getCompanyList(companyNumber);
    tick(1000);
    service.getCompanyDetailFromList(companyNumber);
    service.companyDetail$.subscribe((value) => {
      expect(value).toBe(mockCompanyList.items[0]);
    });
    service.companyDetailError$.subscribe((value)=>expect(value).toBe(null));
  }));
});