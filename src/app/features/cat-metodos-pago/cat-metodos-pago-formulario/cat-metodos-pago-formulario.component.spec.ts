import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMetodosPagoFormularioComponent } from './cat-metodos-pago-formulario.component';

describe('CatMetodosPagoFormularioComponent', () => {
  let component: CatMetodosPagoFormularioComponent;
  let fixture: ComponentFixture<CatMetodosPagoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatMetodosPagoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatMetodosPagoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
