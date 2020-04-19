import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Open Banking Accelerator Portal';
  showHeader = false;
  admin = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginService:LoginService) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.admin = this.activatedRoute.firstChild.snapshot.data.admin;
      }
    });
  }
}
