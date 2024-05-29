import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ca-company',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatCardModule, SpinnerComponent, ErrorComponent],
  templateUrl: './company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  #companyService = inject(CompanyService);
  #authService = inject(AuthService); 
  companyDetail$ = this.#companyService.companyDetail$;
  companyDetailError$ = this.#companyService.companyDetailError$;

  @Input()
  companyNumber!:string;

  constructor() {
    this.#authService.checkAuthorized();
  }

  ngOnInit() {
    this.#companyService.getCompanyDetailFromList(this.companyNumber);
  }
}
