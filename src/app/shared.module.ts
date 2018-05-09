import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventFilterPipe } from '../pipes/event-filter/event-filter';
import {TimeAgoPipe} from 'time-ago-pipe';


@NgModule({
    declarations:[EventFilterPipe,TimeAgoPipe],
    imports:[
        IonicPageModule.forChild(EventFilterPipe),
        IonicPageModule.forChild(TimeAgoPipe)
    ],
    exports:[EventFilterPipe,TimeAgoPipe],
    providers:[]
})

export class SharedModule {}