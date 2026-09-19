import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTiposMovimientoFormularioComponent } from './cat-tipos-movimiento-formulario.component';

describe('CatTiposMovimientoFormularioComponent', () => {
  let component: CatTiposMovimientoFormularioComponent;
  let fixture: ComponentFixture<CatTiposMovimientoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTiposMovimientoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatTiposMovimientoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
