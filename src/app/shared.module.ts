import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventFilterPipe } from '../pipes/event-filter/event-filter';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DatevalidatePipe } from '../pipes/datevalidate/datevalidate';

@NgModule({
    declarations:[EventFilterPipe,TimeAgoPipe,DatevalidatePipe],
    imports:[
        IonicPageModule.forChild(EventFilterPipe),
        IonicPageModule.forChild([DatevalidatePipe,TimeAgoPipe])
    ],
    exports:[EventFilterPipe,TimeAgoPipe,DatevalidatePipe],
    providers:[]
})

export class SharedModule {}