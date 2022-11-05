import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/categorias';

  constructor(private http: HttpClient) { }

  getCategoria(id: number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getCategorias() {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteCategoria(id: number) {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  addCategoria(categoria: any) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, categoria);
  }

  updateCategoria(id: number, categoria: any) {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, categoria);
  }

}
