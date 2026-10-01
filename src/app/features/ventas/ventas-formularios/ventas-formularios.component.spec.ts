import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasFormulariosComponent } from './ventas-formularios.component';

describe('VentasFormulariosComponent', () => {
  let component: VentasFormulariosComponent;
  let fixture: ComponentFixture<VentasFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentasFormulariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
