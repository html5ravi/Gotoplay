import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportShopsPage } from './sport-shops';

@NgModule({
  declarations: [
    SportShopsPage,
  ],
  imports: [
    IonicPageModule.forChild(SportShopsPage),
  ],
})
export class SportShopsPageModule {}
