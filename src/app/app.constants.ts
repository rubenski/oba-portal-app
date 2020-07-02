import {HttpHeaders} from '@angular/common/http';

export class AppConstants {
  public static AWS_REGION = 'eu-central-1';
  public static HOST = 'oba-portal.com';
  public static MAX_NUMBER_OF_CERTIFICATES = 25;
  public static MAX_NUMBER_OF_APPLICATIONS = 25;
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

}
