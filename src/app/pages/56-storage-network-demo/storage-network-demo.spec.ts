import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageNetworkDemo } from './storage-network-demo';

describe('StorageNetworkDemo', () => {
  let component: StorageNetworkDemo;
  let fixture: ComponentFixture<StorageNetworkDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageNetworkDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageNetworkDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
