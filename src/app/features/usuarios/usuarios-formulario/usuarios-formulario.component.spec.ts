import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFormularioComponent } from './usuarios-formulario.component';

describe('UsuariosFormularioComponent', () => {
  let component: UsuariosFormularioComponent;
  let fixture: ComponentFixture<UsuariosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
