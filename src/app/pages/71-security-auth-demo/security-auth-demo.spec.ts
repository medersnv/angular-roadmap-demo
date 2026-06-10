import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuthDemo } from './security-auth-demo';

describe('SecurityAuthDemo', () => {
  let component: SecurityAuthDemo;
  let fixture: ComponentFixture<SecurityAuthDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityAuthDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityAuthDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
