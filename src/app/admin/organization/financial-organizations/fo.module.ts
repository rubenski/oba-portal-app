import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {FoListComponent} from './fo-list.component';
import {FoRoutingModule} from './fo.routing.module';
import {FoDetailComponent} from './fo-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FoRoutingModule
  ],
  declarations: [FoListComponent, FoDetailComponent],
  exports: [FoListComponent, FoDetailComponent]
})
export class FoModule {

}
