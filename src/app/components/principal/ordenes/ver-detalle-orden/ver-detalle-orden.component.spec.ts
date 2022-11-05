import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleOrdenComponent } from './ver-detalle-orden.component';

describe('VerDetalleOrdenComponent', () => {
  let component: VerDetalleOrdenComponent;
  let fixture: ComponentFixture<VerDetalleOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetalleOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
