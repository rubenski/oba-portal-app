import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from '../../error.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  serverError: any;
  user: any;

  constructor(private router: Router, private errorService: ErrorService, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.errorService.hasServerError().subscribe(e => this.serverError = e);
    this.loginService.getServerSession();
  }


  getServerError(): any {
    return this.errorService.getServerError();
  }

  isOrganization(): boolean {
    return this.router.url.includes('admin/organization');
  }
}
