import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersDemo } from './providers-demo';

describe('ProvidersDemo', () => {
  let component: ProvidersDemo;
  let fixture: ComponentFixture<ProvidersDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
