import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTiposSucursalFormularioComponent } from './cat-tipos-sucursal-formulario.component';

describe('CatTiposSucursalFormularioComponent', () => {
  let component: CatTiposSucursalFormularioComponent;
  let fixture: ComponentFixture<CatTiposSucursalFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTiposSucursalFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatTiposSucursalFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
