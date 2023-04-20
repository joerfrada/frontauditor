import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoauditoriaComponent } from './tipoauditoria.component';

describe('TipoauditoriaComponent', () => {
  let component: TipoauditoriaComponent;
  let fixture: ComponentFixture<TipoauditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoauditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoauditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
