import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ca-error',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  error = input<Error | ErrorEvent | string | null>(null);

  message = computed(() => {
    const error = this.error();
    if (error instanceof ErrorEvent && error.message) {
      return error.message;
    }
    if (error instanceof Error && error.message) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Unexpected Error Occurred';
  });
}
