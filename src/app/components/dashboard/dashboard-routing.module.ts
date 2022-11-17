import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarCategoriaComponent } from './categorias/agregar-editar-categoria/agregar-editar-categoria.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { VerCategoriaComponent } from './categorias/ver-categoria/ver-categoria.component';
import { AgregarEditarClienteComponent } from './clientes/agregar-editar-cliente/agregar-editar-cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VerClienteComponent } from './clientes/ver-cliente/ver-cliente.component';
import { DashboardComponent } from './dashboard.component';
import { FacturasComponent } from './facturas/facturas.component';
import { VerFacturaComponent } from './facturas/ver-factura/ver-factura.component';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarProductoComponent } from './productos/agregar-producto/agregar-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { VerProductoComponent } from './productos/ver-producto/ver-producto.component';
import { ProfileComponent } from './profile/profile.component';
import { AgregarEditarUsuarioComponent } from './usuarios/agregar-editar-usuario/agregar-editar-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerUsuarioComponent } from './usuarios/ver-usuario/ver-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'agregarUsuario', component: AgregarEditarUsuarioComponent },
      { path: 'editarUsuario/:id', component: AgregarEditarUsuarioComponent },
      { path: 'verUsuario/:id', component: VerUsuarioComponent },
      { path: 'clientes', component: ClientesComponent},
      { path: 'agregarCliente', component: AgregarEditarClienteComponent},
      { path: 'editarCliente/:id', component: AgregarEditarClienteComponent},
      { path: 'verCliente/:id', component: VerClienteComponent},
      { path: 'categorias', component: CategoriasComponent },
      { path: 'editarCategoria/:id', component: AgregarEditarCategoriaComponent },
      { path: 'agregarCategoria', component: AgregarEditarCategoriaComponent },
      { path: 'verCategoria/:id', component: VerCategoriaComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'addProducto', component: AgregarProductoComponent },
      { path: 'editarProducto/:id', component: AgregarProductoComponent },
      { path: 'verProducto/:id', component: VerProductoComponent },
      { path: 'facturas', component: FacturasComponent },
      { path: 'verFactura/:id', component: VerFacturaComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
