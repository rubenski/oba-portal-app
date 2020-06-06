import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from './app.constants';
import {RedirectUrl} from './admin/organization/redirect-urls/redirect.url';
import {CreateRedirectUrl} from './admin/organization/redirect-urls/create.redirect.url';


@Injectable()
export class RedirectUrlService {

  private redirectUrlServiceUrl = environment.obaPortalBackendHostName + '/redirect-urls';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<RedirectUrl[]> {
    return this.http.get<RedirectUrl[]>(this.redirectUrlServiceUrl);
  }

  create(redirectUrl: CreateRedirectUrl): Observable<RedirectUrl> {
    return this.http.post<RedirectUrl>(this.redirectUrlServiceUrl, redirectUrl, AppConstants.HTTP_OPTIONS);
  }

  delete(id): Observable<void> {
    return this.http.delete<void>(this.redirectUrlServiceUrl + '/' + id, AppConstants.HTTP_OPTIONS);
  }
}
