import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonelessDemo } from './zoneless-demo';

describe('ZonelessDemo', () => {
  let component: ZonelessDemo;
  let fixture: ComponentFixture<ZonelessDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonelessDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ZonelessDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
