import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
/**
 * Generated class for the CourtSharingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-court-sharing',
  templateUrl: 'court-sharing.html',
})
export class CourtSharingPage {
    public court_sharing_tabs:any; 
    contributors:any=[
        {
            name:"Ravi G",
            id:1,
            toPayAmount:1050,
            img:"assets/img/profile/200x200kobe.png"
        },{
            name:"Noble A",
            id:2,
            toPayAmount:450,
            img:"assets/img/profile/200x200kobe.png"
        },{
            name:"Guru",
            id:3,
            toPayAmount:1200,
            img:"assets/img/profile/200x200kobe.png"
        },{
            name:"Raghavkumar",
            id:4,
            toPayAmount:2500,
            img:"assets/img/profile/200x200kobe.png"
        },
    ];
    currentDates:any=[
        {
            date:"12/05/2018",
            playedAmount:450,
            contributors:[1,2,3,4],
            shuttleBy:"Ravi"
        },
        {
            date:"11/05/2018",
            playedAmount:300,
            contributors:[1,2,3,4],
            shuttleBy:"Noble"
        },
        {
            date:"10/05/2018",
            playedAmount:450,
            contributors:[1,2,3,4],
            shuttleBy:"Arun"
        },
        {
            date:"09/05/2018",
            playedAmount:280,
            contributors:[1,2,3,4],
            shuttleBy:"Guru"
        }
    ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.court_sharing_tabs = "payment"; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourtSharingPage');
  }


  toggleSection(i) {
    this.currentDates[i].open = !this.currentDates[i].open;
  } 

  addPaymentShare(date) {
    let addModal = this.modalCtrl.create('AddSharePaymentPage');
    addModal.onDidDismiss(item => {
      if (item) {
        item.date =date;
        console.log(item)
      }
    })
    addModal.present();
  }

  addPeople() {
    
    let addModal = this.modalCtrl.create('AddPeoplePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item)
      }
    })
    addModal.present();
  }
  

}
