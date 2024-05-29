import { Provider } from '@angular/core';
import { ApiService } from './api.service';
import { MockApiService } from './mock-api.service';
import { environment } from '../../environments/environment';

export const apiProvider: Provider = {
  provide: ApiService,
  useClass: environment?.useMockService ? MockApiService : ApiService,
};
