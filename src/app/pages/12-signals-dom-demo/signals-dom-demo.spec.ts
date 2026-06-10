import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsDomDemo } from './signals-dom-demo';

describe('SignalsDomDemo', () => {
  let component: SignalsDomDemo;
  let fixture: ComponentFixture<SignalsDomDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsDomDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsDomDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
