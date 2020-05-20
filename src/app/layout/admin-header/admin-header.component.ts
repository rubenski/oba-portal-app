import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../error.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  serverError: any;

  constructor(private router: Router, private errorService: ErrorService) {

  }

  ngOnInit(): void {
    this.errorService.hasServerError().subscribe(e => this.serverError = e);
  }

  isHomePage() {
    return this.router.url === '/page/home';
  }

  isRegister() {
    return this.router.url.includes('/register');
  }

  isLogin() {
    return this.router.url === '/login';
  }


  getServerError(): any {
    return this.errorService.getServerError();
  }
}
