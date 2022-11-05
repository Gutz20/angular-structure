import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { UbicanosComponent } from './ubicanos/ubicanos.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProfileComponent } from './profile/profile.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { ProductsHeaderComponent } from './tienda/products-header/products-header.component';
import { ProductBoxComponent } from './tienda/product-box/product-box.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { VerDetalleOrdenComponent } from './ordenes/ver-detalle-orden/ver-detalle-orden.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    NosotrosComponent,
    ServiciosComponent,
    ContactanosComponent,
    UbicanosComponent,
    LoginComponent,
    RegistroComponent,
    CarritoComponent,
    ProfileComponent,
    TiendaComponent,
    DetalleProductoComponent,
    PaymentComponent,
    SuccessComponent,
    ProductsHeaderComponent,
    ProductBoxComponent,
    OrdenesComponent,
    VerDetalleOrdenComponent,
  ],
  imports: [CommonModule, PrincipalRoutingModule, SharedModule],
})
export class PrincipalModule {}
