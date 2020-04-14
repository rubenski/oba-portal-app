import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) {
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

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logOut() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
