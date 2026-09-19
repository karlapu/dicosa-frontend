import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTiposMovimientoListComponent } from './cat-tipos-movimiento-list.component';

describe('CatTiposMovimientoListComponent', () => {
  let component: CatTiposMovimientoListComponent;
  let fixture: ComponentFixture<CatTiposMovimientoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTiposMovimientoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatTiposMovimientoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
