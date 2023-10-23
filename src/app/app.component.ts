import { Component } from '@angular/core';
import {IRSFormInfoService, STORE_NAME} from "./services/i-r-s-form-info.service";
import {DB_NAME} from "./app.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'demo-angular-ngx-indexed-db';


  constructor(
    public service: IRSFormInfoService
  ) {

  }

  protected readonly DB_NAME = DB_NAME;
  protected readonly STORE_NAME = STORE_NAME;
}
