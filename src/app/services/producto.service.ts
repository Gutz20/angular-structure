import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/productos';
  productos: Producto[] = [];

  public carritoStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getProductoById(id: number) {
    return this.http.get<Producto>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getProductos() {
    return this.http.get<Producto []>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getProductosByCategoria(idCategoria: number) {
    return this.http.get<Producto []>(`${this.myAppUrl}${this.myApiUrl}/categoria/${idCategoria}`);
  }

  getProductosRelacionados(idProducto: number, idCategoria: number) {
    return this.http.get<Producto []>(`${this.myAppUrl}${this.myApiUrl}/${idProducto}/categoria/${idCategoria}`);
  }

  deleteProducto(id: number) {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  addProducto(producto: FormData) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, producto);
  }

  updateProducto(id: number, producto: FormData) {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, producto);
  }


  //Carrito Service : MAYBE

  getProductsCart(): Observable<any> {
    this.loadCart();
    return of(this.productos);
  }

  saveCart() {
    localStorage.setItem('items_carrito', JSON.stringify(this.productos));
  }

  addToCart(productoAgregado: any) {
    this.productos.push(productoAgregado);
    this.saveCart();
  }

  loadCart() {
    try {
      this.productos = JSON.parse(localStorage.getItem('items_carrito') as any || []);
    } catch (err) {
    }
    
  }

  productInCart(product: any): boolean {
    return this.productos.findIndex((x: any) => {
      return x.productoId === product.productoId
    }) > -1;
  }


  removeProduct(producto: any) {
    const index = this.productos.findIndex((x: any) => x.productoId === producto.productoId);

    if (index > -1) {
      this.productos.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.removeItem('total_carrito');
    localStorage.removeItem('items_carrito');
  }

}
