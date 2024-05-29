import { Component, input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { OfficerService } from '../../services/officer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ca-officers-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, SpinnerComponent, ErrorComponent],
  templateUrl: './officers-list.component.html'
})
export class OfficersListComponent implements OnInit {
  #officerService = inject(OfficerService);

  officerList$ = this.#officerService.officerList$;
  loading$ = this.#officerService.loading$;
  error$ = this.#officerService.error$;

  officerNumber = input.required<string>();

  ngOnInit() {
      this.#officerService.getOfficerList(this.officerNumber());
  }
}