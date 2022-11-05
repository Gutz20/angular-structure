import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/model/producto.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductoService } from 'src/app/services/producto.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  productos!: Producto[];
  subTotal!: number;
  cantidad!: number;

  constructor(
    private productoService: ProductoService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsCart();
  }

  getProductsCart() {
    
    this.productoService.loadCart();
    this.productoService
      .getProductsCart()
      // Las imagenes son blob y a lo mejor se deberian traer de la bd para desencriptarlas
      // ya que al traerlas directamente desde la web lo hace con 16bits, siendo las imagenes
      // de 8 bits
      // .pipe(
      //   map((x: Producto[], ) => x.map((producto: Producto) => this.imageProcessingService.crearImagenes(producto)))
      //   )
      .subscribe({
        next: (data: any) => {
          this.productos = data;
        },
        error: (error) => {
          alert(error);
        },
        complete: () => {
          // console.log('Completado');
        },
      });
  }

  eliminarProductoDelCarrito(producto: any) {
    this.productoService.removeProduct(producto);
  }

  get total() {
    return this.productos.reduce(
      (sum, product) => ({
        cantidad: 1,
        precio: sum.precio + product.cantidad * product.precio,
      }), {cantidad: 1, precio: 0}
    ).precio;
  }

  changeSubtotal(product: any, index: any) {
    const qty = product.cantidad;
    const amt = product.precio;
    this.subTotal = amt * qty;

    this.productoService.saveCart();
  }

  checkout() {
    localStorage.setItem('total_carrito', JSON.stringify(this.total));
    this.router.navigate(['/principal/payment'])
  }
}
