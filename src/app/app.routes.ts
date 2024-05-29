import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'company/:companyNumber', loadComponent: () =>
            import('../app/components/company/company.component')
                .then(c => c.CompanyComponent),
        children: [
            {
                path: 'officers', loadComponent: () =>
                    import('../app/components/officers-list/officers-list.component')
                        .then(c => c.OfficersListComponent)
            },
            {
                path: '', loadComponent: () =>
                    import('../app/components/company-detail/company-detail.component')
                        .then(c => c.CompanyDetailComponent)
            },
        ]
    },
    {
        path: 'search/results/:query',
        loadComponent: () => import('../app/components/company-search-results/company-search-results.component')
            .then(c => c.CompanySearchResultsComponent),
    },
    { path: 'search', loadComponent: () => import('../app/components/company-search/company-search.component').then(c => c.CompanySearchComponent) },
    { path: 'error', loadComponent: () => import('../app/components/error/error.component').then(c => c.ErrorComponent) },
    { path: 'unauthorized', loadComponent: () => import('../app/components/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent) },
    { path: '', redirectTo: '/search', pathMatch: 'full' },
];