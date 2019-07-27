import {Component, OnInit} from '@angular/core';
import {PageService} from '../page.service';
import {Page} from '../page';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: Page;

  constructor(private pageService: PageService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    const uniqueUrlName = this.route.snapshot.paramMap.get('uniqueUrlName');
    this.pageService.getPage(uniqueUrlName).subscribe(page => this.page = page);
  }

}
