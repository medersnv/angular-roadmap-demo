import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnpushDemo } from './onpush-demo';

describe('OnpushDemo', () => {
  let component: OnpushDemo;
  let fixture: ComponentFixture<OnpushDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnpushDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnpushDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
