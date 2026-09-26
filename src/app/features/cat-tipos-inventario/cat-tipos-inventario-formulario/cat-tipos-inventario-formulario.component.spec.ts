import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTiposInventarioFormularioComponent } from './cat-tipos-inventario-formulario.component';

describe('CatTiposInventarioFormularioComponent', () => {
  let component: CatTiposInventarioFormularioComponent;
  let fixture: ComponentFixture<CatTiposInventarioFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTiposInventarioFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatTiposInventarioFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
