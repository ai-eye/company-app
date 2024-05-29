import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ca-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent {

}
