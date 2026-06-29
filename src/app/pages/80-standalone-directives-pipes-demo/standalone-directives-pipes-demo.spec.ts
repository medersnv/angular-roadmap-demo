import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneDirectivesPipesDemo } from './standalone-directives-pipes-demo';

describe('StandaloneDirectivesPipesDemo', () => {
  let component: StandaloneDirectivesPipesDemo;
  let fixture: ComponentFixture<StandaloneDirectivesPipesDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneDirectivesPipesDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneDirectivesPipesDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
