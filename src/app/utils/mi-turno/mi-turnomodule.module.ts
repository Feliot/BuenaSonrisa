import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoComponent } from './turno/turno.component';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [  TurnoComponent ],
  exports: [ TurnoComponent ],
  imports: [
    CommonModule, MaterialModule, FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [TurnoComponent]
})
export class MiTurnomoduleModule { }
