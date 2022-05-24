import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturaComponent } from './components/asignatura/asignatura.component';
import { CursoComponent } from './components/curso/curso.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'HomePage' }
  },
  {
    path: 'asignaturas',
    component: AsignaturaComponent,
    data: { animation: 'openClosePage' }
  },
  {
    path: 'estudiantes',
    component: EstudianteComponent,
    data: { animation: 'openClosePage' }
  },
  {
    path: 'curso',
    component: CursoComponent,
    data: { animation: 'openClosePage' }
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
