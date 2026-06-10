import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiNativeDevDemo } from './ai-native-dev-demo';

describe('AiNativeDevDemo', () => {
  let component: AiNativeDevDemo;
  let fixture: ComponentFixture<AiNativeDevDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiNativeDevDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(AiNativeDevDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
