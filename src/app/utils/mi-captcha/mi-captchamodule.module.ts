import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaComponent } from './captcha/captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [CaptchaComponent],
  exports: [CaptchaComponent],
  imports: [
    CommonModule,
    RecaptchaModule.forRoot() // Keep in mind the "forRoot"-magic nuances!
  ]
})
export class MiCaptchamoduleModule { }