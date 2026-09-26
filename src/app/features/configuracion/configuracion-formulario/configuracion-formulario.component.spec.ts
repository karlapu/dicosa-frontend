import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionFormularioComponent } from './configuracion-formulario.component';

describe('ConfiguracionFormularioComponent', () => {
  let component: ConfiguracionFormularioComponent;
  let fixture: ComponentFixture<ConfiguracionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
