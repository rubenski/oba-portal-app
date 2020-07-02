import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from './app.constants';
import {Application} from './admin/organization/applications/application';
import {CreateApplicationRequest} from './admin/organization/applications/create.application.request';

@Injectable()
export class ApplicationService {

  private applicationsUrl = environment.obaPortalBackendHostName + '/applications/';

  constructor(private http: HttpClient) {
  }

  findOne(id): Observable<Application> {
    return this.http.get<Application>(this.applicationsUrl + '/' + id);
  }

  findAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationsUrl);
  }

  create(createApplication: CreateApplicationRequest): Observable<Application> {
    return this.http.post<Application>(this.applicationsUrl, createApplication, AppConstants.HTTP_OPTIONS);
  }


}
