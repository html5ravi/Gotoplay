import { Component } from '@angular/core';
import { IonicPage, NavController, SegmentButton, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { EventsModel } from './events.model';
import { EventsService } from './events.service';
import { EventDetailPage } from '../event-detail/event-detail';

@IonicPage()
@Component({
  selector: 'events-page',
  templateUrl: 'events.html'
})
export class EventsPage {
  segment: string;
  schedule: EventsModel = new EventsModel();
  loading: any;

  constructor(
    public nav: NavController,
    public scheduleService: EventsService,
    public loadingCtrl: LoadingController
  ) {
    this.segment = "today";
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.scheduleService
      .getData()
      .then(data => { console.log(data)
        this.schedule.past = data.past;
        this.schedule.today = data.today;
        this.schedule.upcoming = data.upcoming;
        this.loading.dismiss();
      });
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  gotoDetailsPage(item){
    this.nav.push('EventDetailPage');
  }

}
