import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-company-search',
  standalone: true,
  templateUrl: './company-search.component.html',
  styleUrl: './company-search.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySearchComponent {
  #fb = inject(FormBuilder);
  #router = inject(Router);

  searchForm = this.#fb.group({
    searchInput: ['', [Validators.required, Validators.pattern('^[a-zA-Z]|^[0-9]*$')]] //numbers XOR letters
  });

  onSubmit() {
    if (this.searchForm.valid) {
      this.#router.navigate(['search/results', this.searchForm.value.searchInput]);
    }
  }
}
