import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnidadModalComponent } from './select-unidad-modal.component';

describe('SelectUnidadModalComponent', () => {
  let component: SelectUnidadModalComponent;
  let fixture: ComponentFixture<SelectUnidadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUnidadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUnidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
