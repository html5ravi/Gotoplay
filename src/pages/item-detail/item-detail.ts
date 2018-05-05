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
    
  }

  register(id){
    this.navCtrl.push('RegisterTeamPage', {
      item: this.item
    });
  }
  

}
