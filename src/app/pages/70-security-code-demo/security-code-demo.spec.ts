import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCodeDemo } from './security-code-demo';

describe('SecurityCodeDemo', () => {
  let component: SecurityCodeDemo;
  let fixture: ComponentFixture<SecurityCodeDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityCodeDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityCodeDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
