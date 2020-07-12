import {ApplicationService} from '../../application.service';
import {ActivatedRoute} from '@angular/router';
import {AdminHeaderService} from '../../admin.header.service';
import {OnInit} from '@angular/core';
import {Application} from '../organization/applications/application';


export abstract class ApplicationBaseComponent implements OnInit {

  protected application: Application;


  public constructor(public applicationService: ApplicationService,
                     public route: ActivatedRoute,
                     public adminHeaderService: AdminHeaderService) {
    // When we navigate between applications, the route doesn't change, only the value of the id variable in the path. We therefore
    // subscribe to the params collection in order to detect changes and run ngOnInit() ourselves.
    // See : https://stackoverflow.com/questions/41678356/router-navigate-does-not-call-ngoninit-when-same-page
    // We also check if the id in the path changed. If not, we are navigating within the application and we should not run ngOnInit again
    route.params.subscribe(val => {
      const applicationId = this.route.snapshot.paramMap.get('id');
      if (this.application && applicationId !== this.application.id) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.applicationService.findApplication(this.route.snapshot.paramMap.get('id')).subscribe(result => {
      console.log('Results are in!');
      console.log(result.name);
      this.adminHeaderService.updateApplication(result);
      this.application = result;
      this.init();
    });
  }

  abstract init();
}
