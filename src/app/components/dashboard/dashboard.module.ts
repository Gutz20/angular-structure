import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AgregarEditarUsuarioComponent } from './usuarios/agregar-editar-usuario/agregar-editar-usuario.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AgregarEditarCategoriaComponent } from './categorias/agregar-editar-categoria/agregar-editar-categoria.component';
import { VerCategoriaComponent } from './categorias/ver-categoria/ver-categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { VerProductoComponent } from './productos/ver-producto/ver-producto.component';
import { VerUsuarioComponent } from './usuarios/ver-usuario/ver-usuario.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { AgregarProductoComponent } from './productos/agregar-producto/agregar-producto.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DragDirective } from './productos/drag.directive';
import { MostrarImagenesDeProductoComponent } from './productos/mostrar-imagenes-de-producto/mostrar-imagenes-de-producto.component';
import { FacturasComponent } from './facturas/facturas.component';
import { VerFacturaComponent } from './facturas/ver-factura/ver-factura.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    UsuariosComponent,
    ReportesComponent,
    AgregarEditarUsuarioComponent,
    AgregarEditarUsuarioComponent,
    CategoriasComponent,
    AgregarEditarCategoriaComponent,
    VerCategoriaComponent,
    ProductosComponent,
    VerProductoComponent,
    VerUsuarioComponent,
    ProfileComponent,
    AgregarProductoComponent,
    SidebarComponent,
    DragDirective,
    MostrarImagenesDeProductoComponent,
    FacturasComponent,
    VerFacturaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class DashboardModule { }
