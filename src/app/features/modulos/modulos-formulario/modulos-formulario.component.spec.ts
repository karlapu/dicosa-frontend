import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosFormularioComponent } from './modulos-formulario.component';

describe('ModulosFormularioComponent', () => {
  let component: ModulosFormularioComponent;
  let fixture: ComponentFixture<ModulosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulosFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
