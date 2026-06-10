import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsStreamsDemo } from './rxjs-streams-demo';

describe('RxjsStreamsDemo', () => {
  let component: RxjsStreamsDemo;
  let fixture: ComponentFixture<RxjsStreamsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsStreamsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsStreamsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
