import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'ca-company-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  templateUrl: './company-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailComponent {
  #companyService = inject(CompanyService);
  companyDetail$ = this.#companyService.companyDetail$;
}
