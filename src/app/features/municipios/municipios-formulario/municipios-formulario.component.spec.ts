import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipiosFormularioComponent } from './municipios-formulario.component';

describe('MunicipiosFormularioComponent', () => {
  let component: MunicipiosFormularioComponent;
  let fixture: ComponentFixture<MunicipiosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipiosFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipiosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
