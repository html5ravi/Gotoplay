import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
listItems: Observable<Item[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: RealdataProvider) { 
    //this.listItems = this.items.get('Events');
  }

  /**
   * Perform a service for the proper items.
   */


  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    // this.currentItems = this.items.query({
    //   title: val
    // });
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
