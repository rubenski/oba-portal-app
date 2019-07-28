import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MfaComponent} from './mfa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MfaComponent
  ],
  declarations: [MfaComponent]
})
export class MfaModule { }
