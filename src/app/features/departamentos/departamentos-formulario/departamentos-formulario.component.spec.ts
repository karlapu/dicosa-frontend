import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosFormularioComponent } from './departamentos-formulario.component';

describe('DepartamentosFormularioComponent', () => {
  let component: DepartamentosFormularioComponent;
  let fixture: ComponentFixture<DepartamentosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartamentosFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
