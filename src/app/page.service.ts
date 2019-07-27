import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Page} from './page';
import {AppConstants} from './app.constants';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Origin: 'http://localhost:4200'})
};

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private pagesUrl = AppConstants.API_HOST + '/pages/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getPage(uniqueUrlName: string): Observable<Page> {
    return this.http.get<Page>(this.pagesUrl + uniqueUrlName)
      .pipe(
        tap(_ => this.log('fetched page' + uniqueUrlName)),
        catchError(this.handleError<Page>('getPage', null))
      );
  }

  private log(message: string) {
    this.messageService.add(`PageService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
