import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [  QrcodeComponent ],
  exports: [ QrcodeComponent ],
  imports: [
    CommonModule, NgxQRCodeModule
  ],
  entryComponents: [QrcodeComponent]
})
export class MiCodemoduleModule { }
