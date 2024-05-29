import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiService } from './services/api.service';
import { MockApiService } from './services/mock-api.service';

const apiProvider = {
  provide: ApiService,
  useClass: environment?.useMockService ? MockApiService : ApiService,
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, 
    withComponentInputBinding(), 
    withRouterConfig({ paramsInheritanceStrategy: 'always' })), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    apiProvider
  ]
};
