import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable()
export class ErrorService {

  private serverError: any;
  private isServerError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setServerError(err) {
    console.log('setting error');
    this.serverError = err;
    this.isServerError.next(true);
  }

  hasServerError(): Observable<boolean> {
    console.log('whuuuut');
    return this.isServerError;
  }

  getServerError(): any {
    return this.serverError;
  }

  clearError() {
    this.serverError = null;
    this.isServerError.next(false);
  }
}
