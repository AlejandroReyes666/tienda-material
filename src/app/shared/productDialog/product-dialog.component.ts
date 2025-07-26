import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { FormBuilder, Validators,
  ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { Producto } from '../../core/models/ProductosModel';


@Component({
  selector: 'app-product-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto | null
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      precio: [data?.precio || '', [Validators.required, Validators.min(0)]],
      imageUrl: [data?.imageUrl || '', Validators.required],
      descripcion: [data?.descripcion || ''],
      categoria:[data?.categoria||'', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}


