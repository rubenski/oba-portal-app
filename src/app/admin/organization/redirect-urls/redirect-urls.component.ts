import {Component, OnInit} from '@angular/core';
import {RedirectUrlService} from '../../../redirect-url.service';

@Component({
  templateUrl: './redirect-urls.component.html'
})
export class RedirectUrlsComponent implements OnInit {

  constructor(private redirectUrlService: RedirectUrlService) {
  }

  ngOnInit(): void {
    this.redirectUrlService.findAllForOrganization().subscribe(
      data => {
      }
    );
  }

  onSubmit() {

  }
}
