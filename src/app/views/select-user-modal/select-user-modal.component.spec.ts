import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserModalComponent } from './select-user-modal.component';

describe('SelectUserModalComponent', () => {
  let component: SelectUserModalComponent;
  let fixture: ComponentFixture<SelectUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
