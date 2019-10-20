import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router) {
    console.log('Header constructor called');
  }

  ngOnInit() {
    console.log('admin header init!');
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

}
