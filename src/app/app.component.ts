import { Component } from '@angular/core';
import {IRSFormInfoService1} from "./services/i-r-s-form-info-service1.service";
import {DB_NAME} from "./app.module";
import {IRSFormInfoService2} from "./services/i-r-s-form-info-service2.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'demo-angular-ngx-indexed-db';

  constructor(
    public service1: IRSFormInfoService1,
    public service2: IRSFormInfoService2
  ) {

  }

  protected readonly DB_NAME = DB_NAME;

}
