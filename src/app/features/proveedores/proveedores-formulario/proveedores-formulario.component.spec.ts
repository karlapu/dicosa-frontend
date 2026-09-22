import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresFormularioComponent } from './proveedores-formulario.component';

describe('ProveedoresFormularioComponent', () => {
  let component: ProveedoresFormularioComponent;
  let fixture: ComponentFixture<ProveedoresFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedoresFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
