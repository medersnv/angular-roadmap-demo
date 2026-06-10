import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSecurityArchDemo } from './storage-security-arch-demo';

describe('StorageSecurityArchDemo', () => {
  let component: StorageSecurityArchDemo;
  let fixture: ComponentFixture<StorageSecurityArchDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSecurityArchDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageSecurityArchDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
