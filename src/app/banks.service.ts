import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bank} from './admin/organization/banks/bank';


@Injectable()
export class BankService {

  private bankServiceUrl = environment.obaPortalBackendHostName + '/banks';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.bankServiceUrl);
  }
}
