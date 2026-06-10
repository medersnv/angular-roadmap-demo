import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSecurityBasicsDemo } from './storage-security-basics-demo';

describe('StorageSecurityBasicsDemo', () => {
  let component: StorageSecurityBasicsDemo;
  let fixture: ComponentFixture<StorageSecurityBasicsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSecurityBasicsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageSecurityBasicsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
