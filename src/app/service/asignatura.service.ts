import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(
    private http: HttpClient,
  ) { }

  getAsignaturas() {
    return this.http.get<any>(
      `${environment.api}/api/v1/asignaturas`
    );
  }

  getAsignatura(id: number) {
    return this.http.get<any>(
      `${environment.api}/api/v1/asignaturas/${id}`
    );
  }

  insertAsignatura(asignatura: any) {
    console.log(asignatura);
    return this.http.post<any>(
      `${environment.api}/api/v1/asignaturas`,
      asignatura
    );
  }


  updateAsignatura(selectedAsignatura:any, asignatura: any) {
    console.log(selectedAsignatura);
    return this.http.put<any>(
      `${environment.api}/api/v1/asignaturas/${selectedAsignatura.id}`,
      asignatura
    );
  }

  deleteAsignatura(asignatura: any) {
    return this.http.delete<any>(
      `${environment.api}/api/v1/asignaturas/${asignatura.id}`
    );
  }
}
