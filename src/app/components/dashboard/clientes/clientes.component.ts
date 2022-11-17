import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'usuario',
    'nombres',
    'email',
    'telefono',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private reporteService: ReportesService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerClientes() {
    const rol = 'NORMAL';
    this._usuarioService.getUsuariosByRol(rol).subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminarUsuario(usuarioId: number) {
    this._usuarioService.deleteUsuario(usuarioId).subscribe(() => {
      this.mensajeDeExito('eliminado');
      this.obtenerClientes();
    });
  }
  mensajeDeExito(texto: string) {
    this._snackBar.open(`El usuario fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

  generarPDF() {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Clientes';
    const tipo = 'PDF';

    this.reporteService.generarReporte(archivo, tipo).subscribe({
      next: (data: any) => {
        console.log(data);
        let blob: Blob = data.body as Blob;
        let a = document.createElement('a');
        //a.download = fileName;
        a.download = 'Reporte ' + archivo + '-' + formateado;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  generarExcel() {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Clientes';
    const tipo = 'EXCEL';

    this.reporteService.generarReporte(archivo, tipo).subscribe({
      next: (data: any) => {
        console.log(data);
        let blob: Blob = data.body as Blob;
        let a = document.createElement('a');
        a.download = 'Reporte ' + archivo + '-' + formateado;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
