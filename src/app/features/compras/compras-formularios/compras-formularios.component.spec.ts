import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasFormulariosComponent } from './compras-formularios.component';

describe('ComprasFormulariosComponent', () => {
  let component: ComprasFormulariosComponent;
  let fixture: ComponentFixture<ComprasFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprasFormulariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
