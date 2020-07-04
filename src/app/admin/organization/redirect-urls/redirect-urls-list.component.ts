import {Component, OnInit, ViewChild} from '@angular/core';
import {RedirectUrlService} from '../../../redirect-url.service';
import {RedirectUrl} from './redirect.url';
import {CreateRedirectUrl} from './create.redirect.url';

// TODO: when anew URL is added the URL value will remain in the input field. Doing this.newRedirectUrl = new CreateRedirectUrl()
//  triggers validation. Solve maybe with @ViewChild. Not urgent, so leaving this for now.
@Component({
  templateUrl: './redirect-urls-list.component.html'
})
export class RedirectUrlsListComponent implements OnInit {

  redirectUrls: RedirectUrl[];
  newRedirectUrl: CreateRedirectUrl = new CreateRedirectUrl();
  globalError: any;
  @ViewChild('form') form;

  constructor(private redirectUrlService: RedirectUrlService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
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
        this.initData();
        this.form.reset();
      }, error => {
        this.globalError = 'An error occurred';
      }
    );
  }

  delete(id: string) {
    this.redirectUrlService.delete(id).subscribe(
      data => {
        this.initData();
      }, error => {
        this.globalError = 'An error occurred';
      }
    );
  }
}
