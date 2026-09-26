import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosFormularioComponent } from './movimientos-formulario.component';

describe('MovimientosFormularioComponent', () => {
  let component: MovimientosFormularioComponent;
  let fixture: ComponentFixture<MovimientosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovimientosFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
