import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePlanInspeccionComponent } from './informe-plan-inspeccion.component';

describe('InformePlanInspeccionComponent', () => {
  let component: InformePlanInspeccionComponent;
  let fixture: ComponentFixture<InformePlanInspeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformePlanInspeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformePlanInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
