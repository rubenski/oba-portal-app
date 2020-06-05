import {Component, OnInit} from '@angular/core';
import {RedirectUrlService} from '../../../redirect-url.service';
import {RedirectUrl} from './redirect.url';
import {CreateRedirectUrl} from './create.redirect.url';

@Component({
  templateUrl: './redirect-urls-list.component.html'
})
export class RedirectUrlsListComponent implements OnInit {

  redirectUrls: RedirectUrl[];
  newRedirectUrl: CreateRedirectUrl = new CreateRedirectUrl();
  globalError: any;

  constructor(private redirectUrlService: RedirectUrlService) {
  }

  ngOnInit(): void {
    this.redirectUrlService.findAll().subscribe(
      data => {
        this.redirectUrls = data;
      }, error => {
        this.globalError = 'An error occurred';
      }
    );
  }

  onSubmit() {
    this.redirectUrlService.create(this.newRedirectUrl).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }
}
