import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoComponent } from './turno/turno.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [  TurnoComponent ],
  exports: [ TurnoComponent ],
  imports: [
    CommonModule, NgxQRCodeModule
  ],
  entryComponents: [TurnoComponent]
})
export class MiTurnomoduleModule { }
