import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';


@Injectable()
export class FindActiveSessionInterceptor implements HttpInterceptor {


  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

/*    console.log('REQUEST: ' + req);
    if (req.url.includes('sessions') && req.method === 'GET') {
      this.loginService.findObaSession().subscribe(
        data => {
          console.log('Session found? ' + data);
          return next.handle(req);
        },
        error => {
          console.log(error);
        }
      );
    }*/

    return next.handle(req);
  }
}
