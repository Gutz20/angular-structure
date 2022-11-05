import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/model/producto.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Producto | undefined;
  @Output() addToCart = new EventEmitter();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.productoService.addToCart(this.product);
  }
}
