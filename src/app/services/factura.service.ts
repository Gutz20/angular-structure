import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/facturas';

  constructor(private http: HttpClient) { }


  getFacturas() {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getFacturaById(id: number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  crearFactura(factura: any) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, factura);
  }

  getFacturaByIdUser(idUser: number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/usuario/${idUser}`);
  }
  

}
