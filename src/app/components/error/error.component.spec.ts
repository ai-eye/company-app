import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        get: (key: string) => 'someValue',
      },
    },
    queryParams: of({ someQueryParam: 'someValue' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, ErrorComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute },] 

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
