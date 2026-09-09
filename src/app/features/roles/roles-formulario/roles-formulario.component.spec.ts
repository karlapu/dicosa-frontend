import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesFormularioComponent } from './roles-formulario.component';

describe('RolesFormularioComponent', () => {
  let component: RolesFormularioComponent;
  let fixture: ComponentFixture<RolesFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
