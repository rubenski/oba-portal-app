import {MainService} from './main.service';
import {GlobalApiStatus} from './global.api.status';


export class Api {
  id: string;
  type: string;
  sandbox: boolean;
  mainServices: MainService[];
  globalStatus: GlobalApiStatus;
}
