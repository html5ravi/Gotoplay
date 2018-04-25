import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { RealdataProvider } from '../../providers/realdata/realdata';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  currentItems:any;
  constructor(public navCtrl: NavController, navParams: NavParams,public rtp: RealdataProvider,public modalCtrl: ModalController) {
    this.item = navParams.get('item');
    this.currentItems = this.rtp.get('Events/'+this.item.id+'/Teams');
    this.currentItems.subscribe(data=>{
      console.log(data);
    })
  }

  register(id){
    this.navCtrl.push('RegisterTeamPage', {
      id: id
    });
  }
  

}
