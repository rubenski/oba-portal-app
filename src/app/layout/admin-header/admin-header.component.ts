import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ErrorService} from '../../error.service';
import {LoginService} from '../../login/login.service';
import {ApplicationService} from '../../application.service';
import {Application} from '../../admin/organization/applications/application';
import {AdminHeaderService} from '../../admin.header.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

    serverError: any;
    user: any;
    selectedApplication: Application;

    /**
     * The home boolean is here because when an application button is clicked in the main admin header the 'home' button
     * of the underlying application button is not activated. It doesn't respond to the route, probably because AdminHeaderComponent
     * is in a different module than the route it is supposed to respond to? Not sure really, the routerLinkActive patterns of
     * other application navigation buttons are working. I don't want to spend more time on this, so fixing it with this weird boolean.
     */
    home: boolean;

    constructor(private router: Router, private errorService: ErrorService,
                private loginService: LoginService,
                private applicationService: ApplicationService,
                private adminHeaderService: AdminHeaderService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.adminHeaderService.subscribeToApplicationChanges().subscribe(app => {
            this.selectedApplication = app;
        });
        this.errorService.hasServerError().subscribe(e => this.serverError = e);
        this.loginService.getServerSession();
    }

    getServerError(): any {
        return this.errorService.getServerError();
    }

    isOrganization(): boolean {
        return this.router.url.includes('admin/organization');
    }

    isApplication(): boolean {
        return this.router.url.includes('admin/applications');
    }

    selectApplication(id) {
        this.applicationService.findApplication(id).subscribe(result => {
            this.selectedApplication = result;
            this.home = true;
        });
    }

    setHomeButtonInactive() {
        this.home = false;
    }

    allApplications(): Observable<Application[]> {
        return this.adminHeaderService.findApplications();
    }
}
