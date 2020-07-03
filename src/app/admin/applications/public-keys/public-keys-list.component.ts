import {Component} from '@angular/core';
import {ApplicationBaseComponent} from '../application.base.component';
import {PublicKey} from './public.key';
import {CreatePublicKeyRequest} from './create.public.key.request';

@Component({
  templateUrl: './public-keys-list.component.html'
})
export class PublicKeysListComponent extends ApplicationBaseComponent {

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
    this.applicationService.deleteApplicationPublicKey(this.application.id, id).subscribe(() => this.init());
  }

  submit() {
    this.applicationService.createApplicationPublicKeys(this.application.id, this.publicKeyRequest).subscribe(result => {
      this.ngOnInit();
      this.publicKeyRequest = new CreatePublicKeyRequest();
    }, error => {
      if (error.error.code === 'APP004') {
        this.globalError = 'Not a valid public key';
      }
    });
  }
}
