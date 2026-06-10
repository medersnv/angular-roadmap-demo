import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSecurityLimitsDemo } from './storage-security-limits-demo';

describe('StorageSecurityLimitsDemo', () => {
  let component: StorageSecurityLimitsDemo;
  let fixture: ComponentFixture<StorageSecurityLimitsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSecurityLimitsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageSecurityLimitsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
