import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healtcheck(): string {
    return 'App is up and runnning';
  }
}
