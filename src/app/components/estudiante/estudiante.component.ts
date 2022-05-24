import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Estudiante } from 'src/app/interface/estudiante';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EstudianteComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'identificacion', 'programa', 'acciones'];

  form: FormGroup;
  selectedEstudiante: Estudiante | undefined

  accion: any;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private estudianteService: EstudianteService,
  ) {
    this.form = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      apellido: ["", [Validators.required, Validators.maxLength(50)]],
      identificacion: ["", [Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9-]{1,20}$")]],
      correo: ["", [Validators.required, Validators.maxLength(50), Validators.email]],
      programa: ["", [Validators.required, Validators.maxLength(50)]],
    })
  }

  async ngOnInit() {
    this.loadEstudiantes();
  }

  loadEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((ELEMENT_DATA: any) => {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }, (error: any) => {
      console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goHome() {
    this.router.navigate(['home']);
  }

  open(content: any, accion: any, estudiante?: any) {
    this.accion = accion
    this.selectedEstudiante = estudiante
    this.resetForm(estudiante)

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
      this.estudianteService.insertEstudiante(this.form.value).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar("CREADO CON EXITO", 'Cerrar')
        this.modalService.dismissAll()
        this.loadEstudiantes();
      })
    }
  }

  modificar() {
    if (this.form.valid) {
      this.estudianteService.updateEstudiante(this.selectedEstudiante, this.form.value).subscribe((res: any) => {
        console.log(res);
        this.openSnackBar("Actualizado con Éxito", 'Cerrar')
        this.modalService.dismissAll()
        this.loadEstudiantes();
      })
    }
  }

  eliminar(estudiante: Estudiante) {
    this.estudianteService.deleteEstudiante(estudiante).subscribe((res: any) => {
      console.log(res);
      this.openSnackBar("Eliminado con Éxito", 'Cerrar')
      this.modalService.dismissAll()
      this.loadEstudiantes();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  resetForm(selectedEstudiante: Estudiante | undefined = undefined) {
    if (selectedEstudiante == undefined) {
      this.selectedEstudiante = undefined
      this.form.reset()
    } else {
      this.form.get("nombre")?.setValue(selectedEstudiante?.nombre);
      this.form.get("apellido")?.setValue(selectedEstudiante?.apellido);
      this.form.get("identificacion")?.setValue(selectedEstudiante?.identificacion);
      this.form.get("correo")?.setValue(selectedEstudiante?.correo);
      this.form.get("programa")?.setValue(selectedEstudiante?.programa);
    }
  }
}
