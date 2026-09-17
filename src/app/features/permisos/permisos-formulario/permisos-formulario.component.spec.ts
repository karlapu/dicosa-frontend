import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosFormularioComponent } from './permisos-formulario.component';

describe('PermisosFormularioComponent', () => {
  let component: PermisosFormularioComponent;
  let fixture: ComponentFixture<PermisosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisosFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
