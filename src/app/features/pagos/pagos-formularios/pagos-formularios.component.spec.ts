import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosFormulariosComponent } from './pagos-formularios.component';

describe('PagosFormulariosComponent', () => {
  let component: PagosFormulariosComponent;
  let fixture: ComponentFixture<PagosFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagosFormulariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
