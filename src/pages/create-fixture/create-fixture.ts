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
  assignToPool:any=[];
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
  saveObj:any={};
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,public rtp: RealdataProvider) {
    let item = navParams.get('item');
    console.log(item.id)
    //this.teams = this.rtp.get('Events/'+item.id+'/Teams').valueChanges();
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.rtp.get('Events/'+item.id+'/Teams').valueChanges().subscribe(data=>{
        this.teams = data;
        this.loading.dismiss();
    });
    this.createFixture = "create";       
        
  }
  saveFixtures(obj){
    console.log(obj)
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
