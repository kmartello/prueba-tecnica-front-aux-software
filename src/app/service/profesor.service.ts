import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(
    private http: HttpClient,
  ) { }


  getProfesores() {
    return this.http.get<any>(
      `${environment.api}/api/v1/profesores`
    );
  }

  getProfesor(id: number) {
    return this.http.get<any>(
      `${environment.api}/api/v1/profesores/${id}`
    );
  }

  insertProfesor(profesor: any) {
    return this.http.post<any>(
      `${environment.api}/api/v1/profesores`,
      profesor
    );
  }

  updateProfesor(profesor: any) {
    return this.http.put<any>(
      `${environment.api}/api/v1/profesores/${profesor.id}`,
      profesor
    );
  }

  deleteProfesor(profesor: any) {
    return this.http.delete<any>(
      `${environment.api}/api/v1/profesores/${profesor.id}`
    );
  }
}
