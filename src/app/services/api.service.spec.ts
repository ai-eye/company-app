import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, COMPANIES_API_URL, OFFICERS_API_URL } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to the companies API', () => {
    const query = 'example';
    const expectedUrl = `${COMPANIES_API_URL}?Query=${query}`;

    service.getCompanySearchResponse(query).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
  });

  it('should make a GET request to the officers API', () => {
    const companyNumber = '123456';
    const expectedUrl = `${OFFICERS_API_URL}=${companyNumber}`;

    service.getOfficersResponse(companyNumber).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
  });

  // xit('should handle errors', () => {
  //   const error = new Error('Test error');

  //   service['#handleError'](error);

  //   // Add your assertions for error handling here
  // });
});