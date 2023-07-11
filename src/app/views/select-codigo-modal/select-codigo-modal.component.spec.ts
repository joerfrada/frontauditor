import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCodigoModalComponent } from './select-codigo-modal.component';

describe('SelectCodigoModalComponent', () => {
  let component: SelectCodigoModalComponent;
  let fixture: ComponentFixture<SelectCodigoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCodigoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCodigoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
