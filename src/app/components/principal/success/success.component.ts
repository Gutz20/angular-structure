import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/model/factura.model';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  constructor(
    private router: Router,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {}

  goBackToHome() {
    this.productoService.clearProducts();
    this.router.navigate(['/principal']);
  }
}
