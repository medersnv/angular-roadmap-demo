import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOfflineDemo } from './storage-offline-demo';

describe('StorageOfflineDemo', () => {
  let component: StorageOfflineDemo;
  let fixture: ComponentFixture<StorageOfflineDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageOfflineDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageOfflineDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
