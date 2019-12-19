import { MiCaptchamoduleModule } from './mi-captcha/mi-captchamodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiCodemoduleModule } from './mi-qrcode/mi-qrcodemodule.module';
import { MiTurnomoduleModule } from './mi-turno/mi-turnomodule.module'


@NgModule({
  declarations: [ ],
  exports: [MiCaptchamoduleModule,
    MiCodemoduleModule,MiTurnomoduleModule],
  imports: [
    CommonModule,
    MiCaptchamoduleModule,
    MiCodemoduleModule,
    MiTurnomoduleModule
  ]
})
export class UtilmoduleModule { }
