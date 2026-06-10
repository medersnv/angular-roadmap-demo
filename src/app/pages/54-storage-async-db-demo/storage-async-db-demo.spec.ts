import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAsyncDbDemo } from './storage-async-db-demo';

describe('StorageAsyncDbDemo', () => {
  let component: StorageAsyncDbDemo;
  let fixture: ComponentFixture<StorageAsyncDbDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageAsyncDbDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageAsyncDbDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
