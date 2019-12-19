import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
 /*  @Input()resolved($event)6LflksEUAAAAAPAt5DoIupYdHqh9hpLKgHPirnla
 */
@Output() bactivate= new  EventEmitter();
  constructor() { }
  public resolved(captchaResponse: string) {
    this.bactivate.emit(true);
 /*    console.log(`Resolved captcha with response ${captchaResponse}:`); */
  }
  ngOnInit() {

  }

}
