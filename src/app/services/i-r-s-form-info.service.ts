import {Injectable, OnDestroy} from "@angular/core";
import {IRSFormInfo} from "../models/i-r-s-form-info";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {NgxIndexedDBService, ObjectStoreMeta, ObjectStoreSchema} from "ngx-indexed-db";

export const STORE_NAME: string = 'irsforms';

// STORE_SCHEMA seems to something of a misnomer.
// It is used to define indexes to be created and used
// It does not define the schema of store values.
// Maybe I don't understand this.

const STORE_SCHEMA: ObjectStoreSchema[] = [];

// STORE_CONFIG defines
// the property to be used as the key to the store
// whether the key will be automatically generated or not

export const STORE_CONFIG = {

  keyPath: 'id',

  autoIncrement: false,

};

export const STORE_META: ObjectStoreMeta = {

  store: STORE_NAME,

  storeConfig: STORE_CONFIG,

  storeSchema: STORE_SCHEMA

};

@Injectable({
  providedIn: 'root'
})
export class IRSFormInfoService implements OnDestroy {

  public sampleData: IRSFormInfo[] = require('../data/data.json');

  public fips: IRSFormInfo[] = [];
  public fipsSubject
    = new BehaviorSubject<IRSFormInfo[]>(this.fips);
  public fips$: Observable<IRSFormInfo[]>
    = this.fipsSubject.asObservable();

  public sub: Subscription;

  public errorMessage: string = '';

  constructor(
    private dbService: NgxIndexedDBService
  ) {

  }

  public ngOnDestroy(): void {

    if (this.sub) {

      this.sub.unsubscribe();

    }

  }

  createStore() {

    // It is not clear whether this step creates the DB if not present or
    // if the DB is already created by the app module

    this.dbService.createObjectStore(STORE_META);

  }

  addData() {

    for (let item of this.sampleData) {

      this.addItem(item);

    }

  }

  addItem(item: IRSFormInfo) {

    this.sub = this.dbService
      .add(STORE_NAME, item)
      .subscribe(
        (key) => {

          // console.log('addIrsFormInfo key: ', key); TOO NOISY

          // Show the results
          this.getAll();

        },

        (error) => {

          this.errorMessage = error.errorMessage;

        }
      );


  }

  clearStore() {

    this.dbService.clear(STORE_NAME).subscribe(
      (successDeleted) => {

        this.fips = [];

        this.fipsSubject.next(this.fips);

        console.log('success? ', successDeleted);

      },

      (error) => {

        this.errorMessage = error.errorMessage;

      }
    );

  }

  deleteStore() {

    this.dbService.deleteObjectStore(STORE_NAME);

  }

  deleteDb() {

    this.dbService.deleteDatabase().subscribe(
      (deleted) => {

        console.log('Database deleted successfully: ', deleted);

      },

      (error) => {

        this.errorMessage = error.errorMessage;

      }
    );

  }

  public getAll() {

    this.sub = this.dbService.getAll(STORE_NAME).subscribe(
      (fips: any[]) => { // TODO any[] versus IRSFormInfo[]?

        this.fips = fips;

        this.fipsSubject.next(this.fips);

      },

      (error) => {

        this.errorMessage = error.errorMessage;

      }
    );

  }

  addBulkData() {

    this.sub = this.dbService
      .bulkAdd( STORE_NAME, this.sampleData )
      .subscribe(

        ( keys ) => {

          console.log(
            'addBulkData keys: ',
            JSON.stringify( keys )
          );

          // Show
          this.getAll( );

        },

        ( error ) => {

          console.log(
            'error: ',
            JSON.stringify( error )
          );

          this.errorMessage = error;

        }

      );



  }

}
