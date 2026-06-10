import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Artifacts } from './artifacts';

describe('Artifacts', () => {
  let fixture: ComponentFixture<Artifacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Artifacts],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Artifacts);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
