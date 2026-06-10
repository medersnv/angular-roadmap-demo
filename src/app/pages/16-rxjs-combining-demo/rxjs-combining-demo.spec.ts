import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsCombiningDemo } from './rxjs-combining-demo';

describe('RxjsCombiningDemo', () => {
  let component: RxjsCombiningDemo;
  let fixture: ComponentFixture<RxjsCombiningDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsCombiningDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsCombiningDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
