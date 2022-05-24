import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Asignatura } from 'src/app/interface/asignatura';
import { Curso } from 'src/app/interface/curso';
import { Estudiante } from 'src/app/interface/estudiante';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { CursoService } from 'src/app/service/curso.service';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { ProfesorService } from 'src/app/service/profesor.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {


  dataSource: any;
  displayedColumns: string[] = ['asignatura', 'estudiante', 'acciones'];

  form: FormGroup;
  selectedCurso: Curso | undefined

  estudiantes: Estudiante[] = []
  asignaturas: Asignatura[] = []
  accion: any;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private cursoService: CursoService,
    private estudianteService: EstudianteService,
    private asignaturaService: AsignaturaService,
  ) {
    this.form = this.formBuilder.group({
      id_estudiante: ["", [Validators.required, Validators.maxLength(50)]],
      id_asignatura: ["", [Validators.required, Validators.maxLength(50)]],
    })
  }

  async ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
    this.cursoService.getCursos().subscribe((ELEMENT_DATA: any) => {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }, (error: any) => {
      console.log(error);
    });
    this.estudianteService.getEstudiantes().subscribe((estudiantes: any) => {
      this.estudiantes = estudiantes
    })
    this.asignaturaService.getAsignaturas().subscribe((asignaturas: any) => {
      this.asignaturas = asignaturas
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goHome() {
    this.router.navigate(['home']);
  }

  open(content: any, accion: any, curso?: any) {
    this.accion = accion
    this.selectedCurso = curso
    this.resetForm(curso)

    this.modalService.open(
      content,
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        scrollable: true
      }
    ).result.then((result) => {
      console.log(`result: ${result}`);
    }, (reason) => {
      console.log(reason);
    });
  }

  crear() {
    if (this.form.valid) {
      this.cursoService.insertCurso(this.form.value).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar("CREADO CON EXITO", 'Cerrar')
        this.modalService.dismissAll()
        this.loadCursos();
      })
    }
  }

  modificar() {
    if (this.form.valid) {
      this.cursoService.updateCurso(this.selectedCurso, this.form.value).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar("Actualizado con Éxito", 'Cerrar')
        this.modalService.dismissAll()
        this.loadCursos();
      })
    }
  }

  eliminar(curso: Curso) {
    this.cursoService.deleteCurso(curso).subscribe((res: any) => {
      console.log(res);
      this.openSnackBar("Eliminado con Éxito", 'Cerrar')
      this.modalService.dismissAll()
      this.loadCursos();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  resetForm(selectedCurso: Curso | undefined = undefined) {
    if (selectedCurso == undefined) {
      this.selectedCurso = undefined
      this.form.reset()
    } else {
      this.form.get("id_estudiante")?.setValue(selectedCurso?.id_estudiante);
      this.form.get("id_asignatura")?.setValue(selectedCurso?.id_asignatura);
    }
  }
}
