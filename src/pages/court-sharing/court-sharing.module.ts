import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourtSharingPage } from './court-sharing';

@NgModule({
  declarations: [
    CourtSharingPage,
  ],
  imports: [
    IonicPageModule.forChild(CourtSharingPage),
  ],
})
export class CourtSharingPageModule {}
