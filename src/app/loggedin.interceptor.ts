import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService} from './login/login.service';
import {ErrorService} from './error.service';

@Injectable()
export class LoggedinInterceptor implements HttpInterceptor {


  constructor(private router: Router, private loginService: LoginService, private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.errorService.clearError();
    return next.handle(req).pipe(
      tap(evt => {
        // ignore successful responses
      }),
      catchError((err: any) => {
        console.log('some error happened');
        if (err.status === 401 || err.status === 403) {
          console.log('Routing to login page...');
          this.loginService.logout('/login');
        } else if (err.status === 500) {
          console.log('500!!');
          this.errorService.setServerError(err);
        }

        return throwError(err);
      }));
  }
}
