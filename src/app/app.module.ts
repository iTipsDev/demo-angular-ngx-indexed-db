import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { DBConfig, NgxIndexedDBModule } from "ngx-indexed-db";

import { AppComponent } from './app.component';

export const DB_NAME: string = 'IRSFormsDB';

const DB_VERSION: number = 1;

const dbConfig: DBConfig = {

  name: DB_NAME,

  version: DB_VERSION,

  objectStoresMeta: [ ] // Defined later in IRSFormInfoService service

};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
