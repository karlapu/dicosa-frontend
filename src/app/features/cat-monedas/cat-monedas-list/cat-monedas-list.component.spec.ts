import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMonedasListComponent } from './cat-monedas-list.component';

describe('CatMonedasListComponent', () => {
  let component: CatMonedasListComponent;
  let fixture: ComponentFixture<CatMonedasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatMonedasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatMonedasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
