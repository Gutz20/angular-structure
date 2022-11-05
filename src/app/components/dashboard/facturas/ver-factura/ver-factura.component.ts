import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})
export class VerFacturaComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = [
    'id',
    'producto',
    'cantidad',
    'precio',
    'importe'
  ];
  id!: number;
  factura: any;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private facturaService: FacturaService,
    private aRoute: ActivatedRoute) { 
      this.form = this.fb.group({
        usuario: ['', Validators.required],
        observacion: ['', Validators.required]
      })
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }

  ngOnInit(): void {
    this.obtenerFactura();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerFactura() {
    this.facturaService.getFacturaById(this.id).subscribe({
      next: (data: any) => {
        this.factura = data;
        this.form.setValue({
          usuario: data.usuario.nombre + ' ' + data.usuario.apellido,
          observacion: data.observacion
        })
        this.dataSource.data = data.itemFacturas;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  

}
