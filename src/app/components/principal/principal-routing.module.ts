import { VerDetalleOrdenComponent } from './ordenes/ver-detalle-orden/ver-detalle-orden.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalGuard } from 'src/app/services/normal.guard';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PaymentComponent } from './payment/payment.component';
import { PrincipalComponent } from './principal.component';
import { RegistroComponent } from './registro/registro.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SuccessComponent } from './success/success.component';
import { TiendaComponent } from './tienda/tienda.component';
import { UbicanosComponent } from './ubicanos/ubicanos.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'nosotros', component: NosotrosComponent},
      { path: 'servicios', component: ServiciosComponent},
      { path: 'contactanos', component: ContactanosComponent},
      { path: 'ubicanos', component: UbicanosComponent},
      { path: 'login', component: LoginComponent},
      { path: 'registro', component: RegistroComponent},
      { path: 'tienda', component: TiendaComponent},
      { path: 'detalleProducto/:id', component: DetalleProductoComponent},
      { path: 'ordenes', component: OrdenesComponent},
      { path: 'detalleOrden/:id', component: VerDetalleOrdenComponent},
      { path: 'payment', component: PaymentComponent, canActivate: [NormalGuard]},
      { path: 'success', component: SuccessComponent, canActivate: [NormalGuard]},
      { path: 'carrito', component: CarritoComponent, canActivate: [NormalGuard]}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule {}
