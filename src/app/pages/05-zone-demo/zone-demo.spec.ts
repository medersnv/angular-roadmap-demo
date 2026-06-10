import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDemo } from './zone-demo';

describe('ZoneDemo', () => {
  let component: ZoneDemo;
  let fixture: ComponentFixture<ZoneDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoneDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
