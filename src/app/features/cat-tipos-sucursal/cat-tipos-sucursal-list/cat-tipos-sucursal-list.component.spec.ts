import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTiposSucursalListComponent } from './cat-tipos-sucursal-list.component';

describe('CatTiposSucursalListComponent', () => {
  let component: CatTiposSucursalListComponent;
  let fixture: ComponentFixture<CatTiposSucursalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatTiposSucursalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatTiposSucursalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
