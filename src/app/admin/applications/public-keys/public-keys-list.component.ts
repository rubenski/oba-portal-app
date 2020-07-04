import {Component, ViewChild} from '@angular/core';
import {ApplicationBaseComponent} from '../application.base.component';
import {PublicKey} from './public.key';
import {CreatePublicKeyRequest} from './create.public.key.request';

@Component({
  templateUrl: './public-keys-list.component.html'
})
export class PublicKeysListComponent extends ApplicationBaseComponent {

  @ViewChild('form') form;
  public keys: PublicKey[];
  globalError: any;
  publicKeyRequest: CreatePublicKeyRequest = new CreatePublicKeyRequest();

  init() {
    this.applicationService.findAllApplicationPublicKeys(this.application.id).subscribe(keys => {
      this.keys = keys;
      console.log('ttt ' + this.keys.length);
    });
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this public key?')) {
      this.applicationService.deleteApplicationPublicKey(this.application.id, id).subscribe(() => this.init());
    }
  }

  submit() {
    this.applicationService.createApplicationPublicKeys(this.application.id, this.publicKeyRequest).subscribe(result => {
      this.ngOnInit();
      this.form.reset();
    }, error => {
      if (error.error.code === 'APP004') {
        this.globalError = 'Not a valid public key';
      }
    });
  }
}
