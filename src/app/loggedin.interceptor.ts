import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginService} from './login/login.service';

@Injectable()
export class LoggedinInterceptor implements HttpInterceptor {


  constructor(private router: Router, private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('hit interceptor ' + evt);
        }
      }),
      catchError((err: any) => {
        console.log('some error happened');
        if (err.status === 401 || err.status === 403) {
          console.log('Routing to login page...');
          this.loginService.logout('/login');
        }

        console.log(JSON.stringify(err));

        return throwError(err);
      }));
  }
}
