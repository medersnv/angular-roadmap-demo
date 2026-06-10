import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsBasicsDemo } from './signals-basics-demo';

describe('SignalsBasicsDemo', () => {
  let component: SignalsBasicsDemo;
  let fixture: ComponentFixture<SignalsBasicsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsBasicsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsBasicsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
