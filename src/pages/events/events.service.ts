import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { EventsModel } from './events.model';

@Injectable()
export class EventsService {
  constructor(public http: Http) {
    console.log("event EventsService")
  }

  getData(): Promise<EventsModel> {
    return this.http.get('./assets/example_data/schedule.json')
     .toPromise()
     .then(response => response.json() as EventsModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
