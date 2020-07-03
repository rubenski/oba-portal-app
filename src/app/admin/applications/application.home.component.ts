import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Application} from '../organization/applications/application';
import {ApplicationService} from '../../application.service';


@Component({
  templateUrl: './application.home.component.html'
})
export class ApplicationHomeComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get('id');
  application: Application;

  constructor(private applicationService: ApplicationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.applicationService.findOne(this.id).subscribe(result => {
      this.application = result;
    });
  }
}
