import {Injectable, OnDestroy} from "@angular/core";
import {IRSFormInfo} from "../models/i-r-s-form-info";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {NgxIndexedDBService, ObjectStoreMeta, ObjectStoreSchema} from "ngx-indexed-db";

const STORE_NAME: string = 'irsforms1';

// STORE_SCHEMA seems to something of a misnomer.
// It is used to define indexes to be created and used
// It does not define the schema of store values.
// Maybe I don't understand this.

const STORE_SCHEMA: ObjectStoreSchema[] = [];

// STORE_CONFIG defines
// the property to be used as the key to the store
// whether the key will be automatically generated or not

const STORE_CONFIG = {

  keyPath: 'id',

  autoIncrement: false,

};

const STORE_META: ObjectStoreMeta = {

  store: STORE_NAME,

  storeConfig: STORE_CONFIG,

  storeSchema: STORE_SCHEMA

};

@Injectable({
  providedIn: 'root'
})
export class IRSFormInfoService1 implements OnDestroy {

  public storeName = STORE_NAME;

  public sampleData: IRSFormInfo[] = require('../data/data.json');

  public fips: IRSFormInfo[] = [];
  public fipsSubject
    = new BehaviorSubject<IRSFormInfo[]>(this.fips);
  public fips$: Observable<IRSFormInfo[]>
    = this.fipsSubject.asObservable();

  public sub: Subscription;

  public successMessage: string = '';

  public warningMessage: string = '';

  public errorMessage: string = '';

  public errorAsJson: string = '';

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

    // Clear any prior error messages
    this.clearMessages();

    this.dbService.createObjectStore(STORE_META);

  }

  public clearMessages( ) {

    this.errorMessage = '';
    this.warningMessage = '';
    this.successMessage = '';
    this.errorAsJson = '';

  }

  addData() {

    // Clear any prior messages
    this.clearMessages( );

    for (let item of this.sampleData) {

      this.addItem(item);

      break;

    }

    // Show results
    this.getAll( );

  }

  addItem(item: IRSFormInfo) {

    // Clear any prior messages
    this.clearMessages( );

    this.sub = this.dbService
      .add(STORE_NAME, item)
      .subscribe(
        (key) => {

          // console.log('addIrsFormInfo key: ', key); TOO NOISY

        },

        (error) => {

          this.handleError( error );

        }

      );


  }

  clearStore() {

    // Clear any prior messages
    this.clearMessages( );

    this.dbService.clear(STORE_NAME).subscribe(
      (successDeleted) => {

        console.log('success? ', successDeleted);

        if ( successDeleted ) {

          this.successMessage = 'Cleared store';

          this.fips = [];
          this.fipsSubject.next(this.fips);

        } else {

          this.errorMessage = 'Unable to clear store';

        }

      },

      (error) => {

        this.handleError( error );

      }

    );

  }

  deleteStore() {

    // Clear any prior messages
    this.clearMessages( );

    this.dbService.deleteObjectStore(STORE_NAME);

  }

  deleteDb() {

    // Clear any prior messages
    this.clearMessages( );

    this.dbService.deleteDatabase().subscribe(

      (deleted) => {

        console.log('Database deleted successfully: ', deleted);

        if ( deleted ) {
          this.successMessage = 'Database deleted successfully';
        } else {
          this.errorMessage = 'Database deletion failed';
        }

      },

      (error) => {

        this.handleError( error );

      }

    );

  }

  public getAll() {

    // Clear any prior messages
    this.clearMessages( );

    this.sub = this.dbService.getAll(STORE_NAME).subscribe(

      (fips: any[]) => { // TODO any[] versus IRSFormInfo[]?

        this.fips = fips;

        this.fipsSubject.next(this.fips);

      },

      (error) => {

        this.handleError( error );

      }

   );

  }

  addBulkData() {

    // Clear any prior messages
    this.clearMessages( );

    // This fails as of 2023 10 23

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

          this.handleError( error );

        }

      );

  }

  public handleError(
    error: any
  ) {

    this.errorAsJson = JSON.stringify( error, null, 4 );

    this.errorMessage = error.errorMessage;

    console.log( this.errorAsJson );

  }

}
