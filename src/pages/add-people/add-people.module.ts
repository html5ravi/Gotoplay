import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPeoplePage } from './add-people';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AddPeoplePage,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(AddPeoplePage),
  ],
})
export class AddPeoplePageModule {}
