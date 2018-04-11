import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateFixturePage } from './create-fixture';

@NgModule({
  declarations: [
    CreateFixturePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateFixturePage),
  ],
})
export class CreateFixturePageModule {}
