import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSecurityToolsDemo } from './storage-security-tools-demo';

describe('StorageSecurityToolsDemo', () => {
  let component: StorageSecurityToolsDemo;
  let fixture: ComponentFixture<StorageSecurityToolsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSecurityToolsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageSecurityToolsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
