import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSyncDemo } from './storage-sync-demo';

describe('StorageSyncDemo', () => {
  let component: StorageSyncDemo;
  let fixture: ComponentFixture<StorageSyncDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageSyncDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageSyncDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
