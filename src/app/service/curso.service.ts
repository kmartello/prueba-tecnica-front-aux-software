import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(
    private http: HttpClient,
  ) { }

  getCursos() {
    return this.http.get<any>(
      `${environment.api}/api/v1/clases`
    );
  }

  insertCurso(curso: any) {
    return this.http.post<any>(
      `${environment.api}/api/v1/clases`,
      curso
    );
  }

  updateCurso(selectedCurso: any, curso: any) {
    return this.http.put<any>(
      `${environment.api}/api/v1/clases/${selectedCurso.id}`,
      curso
    );
  }

  deleteCurso(curso: any) {
    return this.http.delete<any>(
      `${environment.api}/api/v1/clases/${curso.id}`
    );
  }

}
