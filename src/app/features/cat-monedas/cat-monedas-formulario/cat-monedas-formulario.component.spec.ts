import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMonedasFormularioComponent } from './cat-monedas-formulario.component';

describe('CatMonedasFormularioComponent', () => {
  let component: CatMonedasFormularioComponent;
  let fixture: ComponentFixture<CatMonedasFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatMonedasFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatMonedasFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
