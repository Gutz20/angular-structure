import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/reportes';

  constructor(private http: HttpClient) {}

  generarReporte(archivo: string, tipo: string) {
    return this.http.get(
      `${this.myAppUrl}${this.myApiUrl}/download/${archivo}`,
      { observe: 'response', responseType: 'blob', params: { tipo: tipo } }
    );
  }

  generarReporteFactura(archivo: string, tipo: string, id: number) {
    return this.http.get(
      `${this.myAppUrl}${this.myApiUrl}/download/${archivo}`,
      { observe: 'response', responseType: 'blob', params: { 
        ID: id,
        tipo: tipo
      } }
    );
  }
}
