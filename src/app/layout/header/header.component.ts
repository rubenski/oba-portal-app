import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    console.log('Header constructor called');
  }

  ngOnInit() {
    console.log('header init!');
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
