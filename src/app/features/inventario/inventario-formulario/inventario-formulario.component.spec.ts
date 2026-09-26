import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioFormularioComponent } from './inventario-formulario.component';

describe('InventarioFormularioComponent', () => {
  let component: InventarioFormularioComponent;
  let fixture: ComponentFixture<InventarioFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventarioFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
