import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasDinamicasComponent } from './listas-dinamicas.component';

describe('ListasDinamicasComponent', () => {
  let component: ListasDinamicasComponent;
  let fixture: ComponentFixture<ListasDinamicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasDinamicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasDinamicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
