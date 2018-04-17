import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
// import { Items } from '../../providers/providers';
//import * as firebase from 'firebase';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Observable } from 'rxjs/Observable';
// export interface Item {title:string, subTitle:string, bannerPic:string;}

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Observable<Item[]>;
  
  constructor(public navCtrl: NavController, public rtp: RealdataProvider, public modalCtrl: ModalController) {   
    this.currentItems = this.rtp.get('Events');
    this.currentItems.subscribe(data=>{
      console.log(data);
    })
  }


  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {    
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.rtp.add(item,'Events');
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.rtp.delete(item,'Events');
  }
  /**
   * Edit an item from the list of items.
   */
  editItem(item:Item) {
    let id=item.id;
    let addModal = this.modalCtrl.create('ItemCreatePage', {
      item: item
    });
    addModal.onDidDismiss(item => {
      if (item) {
        item.id=id;
        console.log(item)
        this.rtp.update(item,'Events');
      }
    })
    addModal.present();    
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
