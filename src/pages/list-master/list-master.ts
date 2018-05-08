import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController,LoadingController,Loading } from 'ionic-angular';

import { Item } from '../../models/item';
// import { Items } from '../../providers/providers';
//import * as firebase from 'firebase';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Observable } from 'rxjs/Observable';
import {TimeAgoPipe} from 'time-ago-pipe';

// export interface Item {title:string, subTitle:string, bannerPic:string;}

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Observable<Item[]>;
  public loading: Loading;
  eventObj:any = [];
  tempArr:any = [];
  events_segmnt:any;
  public today : number 	= Date.now();
  searchQuery: string = '';
  searchTerm: string = '';
  constructor(
    public navCtrl: NavController, 
    public rtp: RealdataProvider, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,) {
    //this.currentItems = this.rtp.get('Events').valueChanges();  
      this.events_segmnt = "upcoming";   
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.rtp.renderEvents('Events').then(data=>{
        console.log(data)
        this.loading.dismiss();
        this.eventObj = data;
      });
      //this.eventsList();   
  }

  eventsList(){
    this.tempArr = this.eventObj;
  }
  

  /**
   * The view loaded, let's query our items for the list
   */


  upcomingEvent(dates){
    //console.log(dates)
    let item = new Date(dates).getTime();
    // if(item >= this.today){
    //   return true;
    // }else{
    //   return false;
    // }  
  };
  


 
  addItem() { 

    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        item.createdAt = this.today;
        //console.log(item)
        this.rtp.add(item,'Events','Added Successfuly!','Your Event Adde Successfuly, Please wait for the Admin approval to show in public.');
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.rtp.delete('Events',item.id,'Are you sure want to delete?','Your Event record will be deleted permanently!');
  }
  /**
   * Edit an item from the list of items.
   */
  editItem(item:Item) {
    console.log(item);
    let id=item.id;
    let addModal = this.modalCtrl.create('ItemCreatePage', {
      item: item
    });
    addModal.onDidDismiss(item => {
      if (item) {
        item.id=id;
        console.log(item)
        //this.rtp.update(item,'Events');
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

  // ionViewDidLoad() {
  //   this.setFilteredLocations();
  // }

  // setFilteredLocations(){
  //   return this.filterLocations(this.searchTerm);
  // }

  // filterLocations(searchTerm:any){
  //   console.log(searchTerm)
  //    this.eventsList();
  //    if (searchTerm && searchTerm.trim() != '') {
  //       this.eventObj = this.eventObj.filter((item) => {
  //           return (item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  //       });
  //     }
    
  // }









}
