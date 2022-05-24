import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(
    private http: HttpClient,
  ) { }

  getEstudiantes() {
    return this.http.get<any>(
      `${environment.api}/api/v1/estudiantes`
    );
  }

  insertEstudiante(estudiante: any) {
    return this.http.post<any>(
      `${environment.api}/api/v1/estudiantes`,
      estudiante
    );
  }

  updateEstudiante(selectedEstudiante: any, estudiante: any) {
    console.log(selectedEstudiante);
    console.log(estudiante);
    return this.http.put<any>(
      `${environment.api}/api/v1/estudiantes/${selectedEstudiante.id}`,
      estudiante
    );
  }

  deleteEstudiante(estudiante: any) {
    return this.http.delete<any>(
      `${environment.api}/api/v1/estudiantes/${estudiante.id}`
    );
  }
}
