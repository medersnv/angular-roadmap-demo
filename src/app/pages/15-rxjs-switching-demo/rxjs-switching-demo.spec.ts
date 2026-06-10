import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsSwitchingDemo } from './rxjs-switching-demo';

describe('RxjsSwitchingDemo', () => {
  let component: RxjsSwitchingDemo;
  let fixture: ComponentFixture<RxjsSwitchingDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsSwitchingDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsSwitchingDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
