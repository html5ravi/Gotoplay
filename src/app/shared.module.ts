import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventFilterPipe } from '../pipes/event-filter/event-filter';
import { PeopleFilterPipe } from '../pipes/people-filter/people-filter';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DatevalidatePipe } from '../pipes/datevalidate/datevalidate';

@NgModule({
    declarations:[EventFilterPipe,PeopleFilterPipe,TimeAgoPipe,DatevalidatePipe],
    imports:[
        IonicPageModule.forChild(EventFilterPipe),
        IonicPageModule.forChild(PeopleFilterPipe),
        IonicPageModule.forChild([DatevalidatePipe,TimeAgoPipe])
    ],
    exports:[EventFilterPipe,PeopleFilterPipe,TimeAgoPipe,DatevalidatePipe],
    providers:[]
})

export class SharedModule {}