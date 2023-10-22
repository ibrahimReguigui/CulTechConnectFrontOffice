import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeDetailsComponent } from './echange-details.component';

describe('EchangeDetailsComponent', () => {
  let component: EchangeDetailsComponent;
  let fixture: ComponentFixture<EchangeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchangeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
