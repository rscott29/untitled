import { ErrorHandler, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setErrorMessage } from '../store/shared/shared.actions';


@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(  ) {
  }

  handleError(error: any): void {
    console.log('ERROR CAUGHT:', error.error.message.toString());
     // this.store.dispatch(setErrorMessage({ message: error.error.message }));
  }
}
