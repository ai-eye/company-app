import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICompany } from '../../interfaces/company.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HighlightPipe } from '../../pipes/highlight.pipe';

@Component({
  selector: 'ca-company-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, HighlightPipe],
  templateUrl: './company-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListComponent {
  @Input()
  companyList: ICompany[] = [];
}
