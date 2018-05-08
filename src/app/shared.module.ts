import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
 import { EventFilterPipe } from '../pipes/event-filter/event-filter';



@NgModule({
    declarations:[EventFilterPipe],
    imports:[
        IonicPageModule.forChild(EventFilterPipe)
    ],
    exports:[EventFilterPipe],
    providers:[]
})

export class SharedModule {}