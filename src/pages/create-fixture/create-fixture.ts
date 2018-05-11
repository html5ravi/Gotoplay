import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,reorderArray,LoadingController,Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Item } from '../../models/item';


@IonicPage()
@Component({
  selector: 'page-create-fixture',
  templateUrl: 'create-fixture.html',
})
export class CreateFixturePage {
  public loading: Loading;
  editButton: string = 'Edit';
  editing: boolean = false;
  createFixture:any;
  //assignToPool:any={};
  pools:any;
  teams: any=[];
  poolArr:any = [
    {name:'A'},
    {name:'B'},
    {name:'C'},
    {name:'D'},
    {name:'E'},
    {name:'F'},
    {name:'G'},
    {name:'H'}
  ];
  saveObj:any={}
  eventId:any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,public rtp: RealdataProvider) {
    this.eventId = navParams.get('item');
    //this.teams = this.rtp.get('Events/'+item.id+'/Teams').valueChanges();
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.rtp.get('Events/'+this.eventId.id+'/Teams').valueChanges().subscribe(data=>{
        this.teams = data;
        console.log(this.teams);
        this.loading.dismiss();
    });
    this.createFixture = "create";       
        
  }
  saveFixtures(){
    let place = 'Events/'+this.eventId.id+'/Teams';
    // this.rtp.update(place,this.eventId.id,this.teams);
    // console.log()
  }
  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.editButton = 'Done';
    } else {
      this.editButton = 'Edit';
    }
  }

  

  reorderData(indexes: any) {
    this.teams = reorderArray(this.teams, indexes);
  }

}
