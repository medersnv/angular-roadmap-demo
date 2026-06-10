import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLibrariesDemo } from './storage-libraries-demo';

describe('StorageLibrariesDemo', () => {
  let component: StorageLibrariesDemo;
  let fixture: ComponentFixture<StorageLibrariesDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageLibrariesDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageLibrariesDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
