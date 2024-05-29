import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    router = inject(Router);
    #isAuthenticated = true; //change this to mock authentication

    checkAuthorized(): void {
        if (!this.#isAuthenticated) {
            this.router.navigate(['/unauthorized']);
        }
    }
}
