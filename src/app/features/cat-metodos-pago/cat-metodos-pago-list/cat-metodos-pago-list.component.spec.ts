import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMetodosPagoListComponent } from './cat-metodos-pago-list.component';

describe('CatMetodosPagoListComponent', () => {
  let component: CatMetodosPagoListComponent;
  let fixture: ComponentFixture<CatMetodosPagoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatMetodosPagoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatMetodosPagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
