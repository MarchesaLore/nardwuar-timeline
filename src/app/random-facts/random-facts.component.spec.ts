import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomFactsComponent } from './random-facts.component';

describe('RandomFactsComponent', () => {
  let component: RandomFactsComponent;
  let fixture: ComponentFixture<RandomFactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomFactsComponent]
    });
    fixture = TestBed.createComponent(RandomFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
