import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Asignatura } from 'src/app/interface/asignatura';
import { Profesor } from 'src/app/interface/profesor';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { ProfesorService } from 'src/app/service/profesor.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {


  dataSource: any;
  displayedColumns: string[] = ['nombre', 'salon', 'horario', 'profesor', 'acciones'];

  form: FormGroup;
  selectedAsignatura: Asignatura | undefined

  profesores: Profesor[] = []
  accion: any;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private asignaturaService: AsignaturaService,
    private profesorService: ProfesorService
  ) {
    this.form = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      salon: ["", [Validators.required, Validators.maxLength(50)]],
      horario: ["", [Validators.required, Validators.maxLength(50)]],
      id_profesor: ["", [Validators.required, Validators.maxLength(50)]],
    })
  }

  async ngOnInit() {
    this.loadAsignaturas();
  }

  loadAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe((ELEMENT_DATA: any) => {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }, (error: any) => {
      console.log(error);
    });
    this.profesorService.getProfesores().subscribe((profesores: any) => {
      this.profesores = profesores
      console.log(profesores);

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goHome() {
    this.router.navigate(['home']);
  }

  open(content: any, accion: any, asignatura?: any) {
    this.accion = accion
    this.selectedAsignatura = asignatura
    this.resetForm(asignatura)

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
      this.asignaturaService.insertAsignatura(this.form.value).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar("CREADO CON EXITO", 'Cerrar')
        this.modalService.dismissAll()
        this.loadAsignaturas();
      })
    }
  }

  modificar() {
    if (this.form.valid) {
      this.asignaturaService.updateAsignatura(this.selectedAsignatura, this.form.value).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar("Actualizado con Éxito", 'Cerrar')
        this.modalService.dismissAll()
        this.loadAsignaturas();
      })
    }
  }

  eliminar(asignatura: Asignatura) {
    this.asignaturaService.deleteAsignatura(asignatura).subscribe((res: any) => {
      console.log(res);
      this.openSnackBar("Eliminado con Éxito", 'Cerrar')
      this.modalService.dismissAll()
      this.loadAsignaturas();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  resetForm(selectedAsignatura: Asignatura | undefined = undefined) {
    if (selectedAsignatura == undefined) {
      this.selectedAsignatura = undefined
      this.form.reset()
    } else {
      this.form.get("nombre")?.setValue(selectedAsignatura?.nombre);
      this.form.get("salon")?.setValue(selectedAsignatura?.salon);
      this.form.get("horario")?.setValue(selectedAsignatura?.horario);
      this.form.get("id_profesor")?.setValue(selectedAsignatura?.id_profesor);
    }
  }
}
