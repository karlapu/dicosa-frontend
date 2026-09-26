import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTiposInventarioListComponent } from './cat-tipos-inventario-list.component';

describe('CatTiposInventarioListComponent', () => {
  let component: CatTiposInventarioListComponent;
  let fixture: ComponentFixture<CatTiposInventarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTiposInventarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatTiposInventarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
