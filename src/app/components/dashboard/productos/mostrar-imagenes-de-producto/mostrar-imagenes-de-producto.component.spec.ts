import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarImagenesDeProductoComponent } from './mostrar-imagenes-de-producto.component';

describe('MostrarImagenesDeProductoComponent', () => {
  let component: MostrarImagenesDeProductoComponent;
  let fixture: ComponentFixture<MostrarImagenesDeProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarImagenesDeProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarImagenesDeProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
